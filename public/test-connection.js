// Script de prueba para verificar la conexión frontend-backend
// Ejecutar desde la consola del navegador cuando ambos servidores estén corriendo

const API_URL = 'http://localhost:3000';

// Función para probar la creación de descuento desde Dragon Ball
async function testCreateDiscountFromDragonBall() {
  console.log('🧪 Probando creación de descuento desde Dragon Ball...');
  
  try {
    const response = await fetch(`${API_URL}/discounts/dragonball`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        characterName: 'Goku',
        ki: '60.000.000',
        image: 'https://dragonball-api.com/characters/goku_normal.webp',
        percent: 35
      })
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Descuento creado exitosamente!');
      console.log('📝 Código generado:', data.discount.code);
      console.log('💾 Datos guardados:', data.discount);
      return data.discount;
    } else {
      console.error('❌ Error al crear descuento:', data.message);
      return null;
    }
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    return null;
  }
}

// Función para probar la obtención de descuentos activos
async function testGetActiveDiscounts() {
  console.log('🧪 Probando obtención de descuentos activos...');
  
  try {
    const response = await fetch(`${API_URL}/discounts/active`, {
      method: 'GET',
      credentials: 'include', // Para enviar cookies
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Descuentos activos obtenidos!');
      console.log(`📊 Total: ${data.discounts.length} descuentos`);
      console.log('📋 Lista:', data.discounts);
      return data.discounts;
    } else {
      console.error('❌ Error al obtener descuentos:', data.message);
      return null;
    }
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    return null;
  }
}

// Función para probar la validación de código
async function testValidateDiscount(code) {
  console.log(`🧪 Probando validación del código: ${code}...`);
  
  try {
    const response = await fetch(`${API_URL}/discounts/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ code })
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Código válido!');
      console.log('💰 Descuento:', `${data.discount.percent}%`);
      console.log('📋 Detalles:', data.discount);
      return data.discount;
    } else {
      console.error('❌ Código inválido:', data.message);
      return null;
    }
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    return null;
  }
}

// Función para verificar la conexión del backend
async function testBackendConnection() {
  console.log('🧪 Probando conexión con el backend...');
  
  try {
    const response = await fetch(`${API_URL}/`, {
      method: 'GET',
    });

    if (response.ok) {
      console.log('✅ Backend conectado correctamente!');
      const data = await response.json();
      console.log('📡 Respuesta:', data);
      return true;
    } else {
      console.error('❌ Backend no responde correctamente');
      return false;
    }
  } catch (error) {
    console.error('❌ No se puede conectar al backend:', error);
    console.log('💡 Asegúrate de que el backend esté corriendo en', API_URL);
    return false;
  }
}

// Ejecutar todas las pruebas
async function runAllTests() {
  console.log('🚀 Iniciando pruebas de conexión Frontend-Backend...\n');
  
  // 1. Verificar conexión
  const connected = await testBackendConnection();
  if (!connected) {
    console.log('\n⚠️ Inicia el backend antes de continuar con las pruebas');
    return;
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // 2. Crear descuento
  const discount = await testCreateDiscountFromDragonBall();
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // 3. Si se creó el descuento, intentar validarlo
  if (discount && discount.code) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo
    await testValidateDiscount(discount.code);
  }
  
  console.log('\n' + '='.repeat(50) + '\n');
  
  // 4. Obtener descuentos activos (requiere autenticación)
  console.log('⚠️ La siguiente prueba requiere autenticación');
  await testGetActiveDiscounts();
  
  console.log('\n✨ Pruebas completadas!\n');
  console.log('📚 Para más información, consulta EJEMPLOS_USO_API.md');
}

// Exportar funciones para uso individual
window.testDiscounts = {
  runAll: runAllTests,
  testConnection: testBackendConnection,
  createDiscount: testCreateDiscountFromDragonBall,
  validateDiscount: testValidateDiscount,
  getActiveDiscounts: testGetActiveDiscounts,
};

console.log('🎯 Script de pruebas cargado!');
console.log('📝 Usa: testDiscounts.runAll() para ejecutar todas las pruebas');
console.log('📝 O usa las funciones individuales:');
console.log('   - testDiscounts.testConnection()');
console.log('   - testDiscounts.createDiscount()');
console.log('   - testDiscounts.validateDiscount("CODIGO")');
console.log('   - testDiscounts.getActiveDiscounts()');
