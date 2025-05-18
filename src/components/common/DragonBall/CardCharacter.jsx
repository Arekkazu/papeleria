import { Typography } from "@mui/material";
import { StyledCard, StyledCardMedia, StyledCardContent } from "./DragonBall.styles";

export const CardCharacter = ({ name, ki, description, image }) => {
  return (
    <StyledCard>
      <StyledCardMedia
        component="img"
        image={image}
        alt={name}
      />
      <StyledCardContent>
        <Typography variant="h4" component="div">
          {name}
        </Typography>
        <Typography variant="h5" component="div">
          Ki: {ki}
        </Typography>
        {/* {description && (
          <Typography variant="body1" color="text.secondary">
            {description}
          </Typography>
        )} */}
      </StyledCardContent>
    </StyledCard>
  );
};
