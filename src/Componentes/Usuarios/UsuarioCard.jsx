import { Card, CardBody, Typography } from "@material-tailwind/react";

export default function UsuarioCard(props) {
  return (
    <Card className="mt-6 bg-white rounded-lg border border-blue-500">
      <CardBody className="flex flex-col items-start">

       <Typography
          variant="h6"
          color="blue"
          className="mb-2 font-medium text-blue-700"
          style={{
            width: "300px",  // Establecer un ancho fijo para el nombre de usuario
            wordWrap: "break-word",  // Evitar que el texto se desborde
          }}
        >
          Nombre: {props.usuario.nomComp}
        </Typography>
      {/* Nombre de usuario */}
        <Typography
          variant="h5"
          color="blue"
          className="mb-2 font-medium text-blue-700"
          style={{
            width: "300px",  // Establecer un ancho fijo para el nombre de usuario
            wordWrap: "break-word",  // Evitar que el texto se desborde
          }}
        >
          Usuario: {props.usuario.nomUsuario}
        </Typography>

          {/* Email de usuario */}
        <Typography
          variant="h5"
          color="blue"
          className="text-gray-700 text-sm"
          style={{
            width: "300px",  // Establecer un ancho fijo para el email
            wordWrap: "break-word",  // Evitar que el texto se desborde
          }}
        >
          Email: {props.usuario.emailUsuario}
        </Typography>

        {/* Contraseña de usuario */}
        <Typography
          className="text-gray-500 italic text-sm"
          style={{
            width: "300px",  // Establecer un ancho fijo para la contraseña
            wordWrap: "break-word",  // Evitar que el texto se desborde
          }}
        >
          Contraseña: {props.usuario.contrasenia}
        </Typography>
      </CardBody>
    </Card>
  );
}
