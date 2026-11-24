---
nombre: Kioskardo
rubro: Kiosco
estado: Listo para usar
orden: 2
color: '#A78BFA'
datos:
  - etiqueta: Cobra con
    valor: Efectivo, débito, crédito, transferencia y QR
  - etiqueta: Turnos
    valor: Horas de cada empleado y cierre de caja por turno
capturas:
  - archivo: ./venta.webp
    movil: ./venta-movil.webp
    epigrafe: Venta
    alt: 'Pantalla de venta: productos por categoría, venta actual, medios de pago y vuelto'
  - archivo: ./venta-celu.webp
    movil: ./venta-celu-movil.webp
    tipo: celu
    epigrafe: En el celular
    alt: Venta desde el celular con buscador y categorías
  - archivo: ./pantalla-cliente.webp
    epigrafe: Pantalla del cliente
    alt: Pantalla que mira el cliente con lo que lleva, el total y el vuelto
  - archivo: ./inventario.webp
    movil: ./inventario-movil.webp
    epigrafe: Inventario
    alt: Inventario con stock, precio y margen de cada producto
  - archivo: ./caja-turno.webp
    movil: ./caja-turno-movil.webp
    epigrafe: Caja del turno
    alt: Caja del turno con el efectivo que debería haber y las ventas por medio de pago
  - archivo: ./turno-cerrado.webp
    movil: ./turno-cerrado-movil.webp
    epigrafe: Cierre de turno
    alt: 'Cierre de turno: el efectivo contado cuadra y se abre el turno siguiente'
  - archivo: ./turnos-horas.webp
    movil: ./turnos-horas-movil.webp
    epigrafe: Turnos y horas
    alt: Turnos y horas de cada empleado en la semana, con lo que faltó o cuadró
---
Venta con lector de códigos o con la cámara del celular, también por peso. Inventario con márgenes y aviso de stock bajo, caja por turno que se cierra contando la plata, y una pantalla para que el cliente vea lo que lleva. Si se corta internet, sigue vendiendo y sincroniza solo cuando vuelve.
