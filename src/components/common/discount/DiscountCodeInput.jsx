import { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import { discountService } from '../../../services/api';

export const DiscountCodeInput = ({ onDiscountApplied }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleApplyDiscount = async () => {
    if (!code.trim()) {
      setMessage({ text: 'Por favor ingresa un código', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await discountService.validate(code.trim());
      
      if (response.success && response.discount) {
        // Guardar el descuento aplicado
        const discountData = {
          code: response.discount.code,
          percent: response.discount.percent,
          discount: response.discount.percent / 100,
          source: response.discount.source,
          ...(response.discount.dragonBallCharacter && {
            name: response.discount.dragonBallCharacter.name,
            ki: response.discount.dragonBallCharacter.ki,
            image: response.discount.dragonBallCharacter.image,
          })
        };
        
        localStorage.setItem('applied_discount', JSON.stringify(discountData));
        
        setMessage({ 
          text: `¡Descuento aplicado! ${response.discount.percent}% de descuento`, 
          type: 'success' 
        });
        
        if (onDiscountApplied) {
          onDiscountApplied(discountData);
        }
        
        setCode('');
      }
    } catch (error) {
      console.error('Error al validar descuento:', error);
      setMessage({ 
        text: error.message || 'Código de descuento inválido o expirado', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleApplyDiscount();
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
        ¿Tienes un código de descuento?
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
        <TextField
          size="small"
          fullWidth
          placeholder="Ingresa tu código"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <Button 
          variant="outlined" 
          onClick={handleApplyDiscount}
          disabled={loading || !code.trim()}
          sx={{ minWidth: 80 }}
        >
          {loading ? 'Validando...' : 'Aplicar'}
        </Button>
      </Box>
      {message.text && (
        <Alert severity={message.type} sx={{ mt: 1 }}>
          {message.text}
        </Alert>
      )}
    </Box>
  );
};
