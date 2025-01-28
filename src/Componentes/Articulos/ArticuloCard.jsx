import { Card, CardBody, Typography } from "@material-tailwind/react";

export default function ArticuloCard(props) {
  return (
    <Card className="mt-6 bg-white rounded-lg border border-blue-500">
      <CardBody className="flex flex-col items-start">
        {/* ID del artículo */}
        <Typography
          variant="h6"
          color="blue"
          className="mb-2 font-medium text-blue-700 "
          style={{
            width: "250px",  // Establecer un ancho fijo para el ID
            wordWrap: "break-word",  // Evitar que el texto se desborde
          }}
        >
          ID: {props.articulo.id}
        </Typography>

        {/* Título del artículo */}
        <Typography
          variant="h5"
          color="blue"
          className="mb-2 font-bold text-xl text-blue-700"
          style={{
            width: "250px",// Establecer un ancho fijo para el título
            wordWrap: "break-word",  // Evitar que el texto se desborde
          }}
        >
          {props.articulo.titulo}
        </Typography>

        {/* Cuerpo del artículo */}
        <Typography
          className="text-gray-700 text-sm"
          style={{
            width: "250px",  // Establecer un ancho fijo para el cuerpo
            wordWrap: "break-word",  // Evitar que el texto se desborde
          }}
        >
          Descripción: {props.articulo.cuerpo}
        </Typography>

        {/* Usuario relacionado */}
        <Typography
          className="text-gray-500 italic text-sm"
          style={{
            width: "250px",  // Establecer un ancho fijo para el encargado
            wordWrap: "break-word",  // Evitar que el texto se desborde
          }}
        >
          Encargado: {props.articulo.usuario}
        </Typography>
      </CardBody>
    </Card>
  );
}
