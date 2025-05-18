import { useEffect, useState } from "react";
import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import { CardCharacter } from "./CardCharacter";
import { Loading } from "./Loading";
import { CharacterContainer } from "./DragonBall.styles";

const DISCOUNT_KEY = "dragonball_discount";
const PRICE_BASE = 1000;
const MIN_DISCOUNT = 0.1; // 10%
const MAX_DISCOUNT = 0.5; // 50%

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const Character = () => {
  const [character, setCharacter] = useState(null);
  const [maxKi, setMaxKi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [claimed, setClaimed] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [discount, setDiscount] = useState(0);

  // On mount: fetch all characters, pick one random, get max Ki
  useEffect(() => {
    const claimedDiscount = localStorage.getItem(DISCOUNT_KEY);
    if (claimedDiscount) {
      setClaimed(true);
      setSnackbar(true);
    }
    fetch("https://dragonball-api.com/api/characters")
      .then(res => res.json())
      .then(json => {
        const chars = json.items || json;
        if (!Array.isArray(chars) || chars.length === 0) return;
        const maxKiValue = Math.max(...chars.map(c => Number(c.ki) || 0));
        setMaxKi(maxKiValue);
        const randomChar = chars[getRandomInt(chars.length)];
        setCharacter(randomChar);
        // Calcular descuento mejorado
        const ki = Number(randomChar.ki) || 0;
        // descuento = 10% + proporcional hasta 50%
        const discountValue = Math.round((MIN_DISCOUNT + (ki / maxKiValue) * (MAX_DISCOUNT - MIN_DISCOUNT)) * 100) / 100;
        setDiscount(discountValue);
        setLoading(false);
      });
  }, []);

  const handleClaim = () => {
    if (!character) return;
    localStorage.setItem(
      DISCOUNT_KEY,
      JSON.stringify({
        name: character.name,
        ki: character.ki,
        image: character.image,
        discount,
        price: PRICE_BASE,
      })
    );
    setClaimed(true);
    setSnackbar(true);
  };

  const handleSnackbarClose = () => setSnackbar(false);

  if (loading) return <Loading />;

  return (
    <CharacterContainer>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <CardCharacter
          name={character.name}
          image={character.image}
          ki={character.ki}
        />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Descuento disponible: <b>{Math.round(discount * 100)}%</b>
        </Typography>
        {!claimed ? (
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, fontWeight: 700, fontSize: 18, px: 4 }}
            onClick={handleClaim}
          >
            Reclamar descuento
          </Button>
        ) : (
          <Typography color="success.main" sx={{ mt: 2, fontWeight: 700 }}>
            ¡Descuento reclamado!
          </Typography>
        )}
        <Snackbar
          open={snackbar}
          autoHideDuration={3500}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: "100%" }}>
            Ya tienes un descuento reclamado.
          </Alert>
        </Snackbar>
      </Box>
    </CharacterContainer>
  );
};
