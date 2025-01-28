import { Card, CardBody, Typography } from "@material-tailwind/react";

export default function ClienteCard(props) {
  return (
    <Card className="mt-6 bg-white rounded-lg border border-blue-500">
      <CardBody className="flex flex-col items-start">
        {/* ID del cliente */}
        <Typography
          variant="h6"
          color="blue"
          className="mb-2 font-medium text-blue-700"
          style={{
            width: "250px",  // Establecer un ancho fijo para el ID
            wordWrap: "break-word",  // Evitar que el texto se desborde
          }}
        >
          ID Cliente: {props.cliente.idCliente}
        </Typography>

        {/* Cédula del cliente */}
        <Typography
          variant="h5"
          color="blue"
          className="mb-2 font-bold text-xl text-blue-700"
          style={{
            width: "250px", // Establecer un ancho fijo para el título
            wordWrap: "break-word",  // Evitar que el texto se desborde
          }}
        >
          Cédula: {props.cliente.cedulaCliente}
        </Typography>

        {/* Nombre del cliente */}
        <Typography
          className="text-gray-700 text-sm"
          style={{
            width: "250px",  // Establecer un ancho fijo para el cuerpo
            wordWrap: "break-word",  // Evitar que el texto se desborde
          }}
        >
          Nombre: {props.cliente.nomCliente}
        </Typography>

        {/* Teléfono celular del cliente */}
        <Typography
          className="text-gray-500 italic text-sm"
          style={{
            width: "250px",  // Establecer un ancho fijo para el teléfono
            wordWrap: "break-word",  // Evitar que el texto se desborde
          }}
        >
          Teléfono: {props.cliente.telCelular}
        </Typography>

        {/* Dirección del cliente */}
        <Typography
          className="text-gray-500 italic text-sm"
          style={{
            width: "250px",  // Establecer un ancho fijo para la dirección
            wordWrap: "break-word",  // Evitar que el texto se desborde
          }}
        >
          Dirección: {props.cliente.direccion}
        </Typography>

        {/* Email del cliente */}
        <Typography
          className="text-gray-500 italic text-sm"
          style={{
            width: "250px",  // Establecer un ancho fijo para el correo
            wordWrap: "break-word",  // Evitar que el texto se desborde
          }}
        >
          Email: {props.cliente.email}
        </Typography>
      </CardBody>
    </Card>
  );
}
