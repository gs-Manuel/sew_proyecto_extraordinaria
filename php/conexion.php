<?php
    class Conexion
    {
        //Cambiar cuando se despliegue en la nube al server de azure
        //username= UO279387
        //password= pepperonipizza
        private $servername = "localhost:3306";
        private $username = "root";
        private $password = "";
        private $dbname = "sew";
        private $conn = null;
        public function __construct()
        {
            $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
            if ($this->conn->connect_error) {
                die("Conexión fallida: " . $this->conn->connect_error);
            }
        }
        public function insertarUsuario($nombre, $email, $contraseña)
        {
            $sql = "INSERT INTO usuario (nombre, email, contraseña) VALUES (?, ?, ?)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bind_param("sss", $nombre, $email, $contraseña);
            $result = $stmt->execute();
            $stmt->close();
            return $result;
        }
        public function ComprobarUsuario($email, $contraseña)
        {
            $sql = "SELECT nombre, email, contraseña FROM usuario";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->get_result();
            $nombre = null;
            while ($usuario = $result->fetch_assoc()) {
                if ($usuario['email'] === $email && $usuario['contraseña'] === $contraseña) {
                    $nombre = $usuario['nombre'];
                    break;
                }
            }
            $stmt->close();
            return $nombre;
        }
        public function ObtenerRecursosTuristicos()
        {
            $sql = "SELECT * FROM recurso_turistico";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();
            return $result;
        }
        public function HacerReserva($idRecursoTuristico, $nombreUsuario)
        {
            if (!$this->hayEspacioDisponible($idRecursoTuristico)) {
                echo "<script>alert('No hay espacio disponible en este recurso turístico.');</script>";
                return 0; // Retorna 0 para indicar que no se pudo hacer la reserva
            }
            $idUsuario = $this->obtenerIdUsuario($nombreUsuario);
            $idReserva = $this->crearReserva($idUsuario);
            $this->agregarDetalleReserva($idReserva, $idRecursoTuristico);
            $this->aumentarOcupacion($idRecursoTuristico);
            $precio = $this->obtenerPrecioRecurso($idRecursoTuristico);
            return $precio;
        }
        private function aumentarOcupacion($idRecursoTuristico)
        {
            $sql = "UPDATE recurso_turistico SET ocupacion = ocupacion + 1 WHERE id_recurso = ?";
            $stmt = $this->conn->prepare($sql);
            $stmt->bind_param("i", $idRecursoTuristico);
            $stmt->execute();
            $stmt->close();
        }
        private function hayEspacioDisponible($idRecursoTuristico)
        {
            $sql = "SELECT ocupacion, limite_ocupacion FROM recurso_turistico WHERE id_recurso = ?";
            $stmt = $this->conn->prepare($sql);
            $stmt->bind_param("i", $idRecursoTuristico);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            $ocupacion = $row['ocupacion'];
            $limiteOcupacion = $row['limite_ocupacion'];
            $stmt->close();
            return $ocupacion < $limiteOcupacion;
        }

        private function obtenerIdUsuario($nombreUsuario)
        {
            $sql = "SELECT id_usuario FROM usuario WHERE nombre=?";
            $stmt = $this->conn->prepare($sql);
            $stmt->bind_param("s", $nombreUsuario);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            $idUsuario = $row['id_usuario'];
            $stmt->close();
            return $idUsuario;
        }

        private function crearReserva($idUsuario)
        {
            $sql = "INSERT INTO reserva (id_usuario) VALUES (?)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bind_param("i", $idUsuario);
            $stmt->execute();
            $idReserva = $stmt->insert_id;
            $stmt->close();
            return $idReserva;
        }

        private function agregarDetalleReserva($idReserva, $idRecursoTuristico)
        {
            $sql = "INSERT INTO detalle_reserva (id_reserva, id_recurso) VALUES (?, ?)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bind_param("ii", $idReserva, $idRecursoTuristico);
            $stmt->execute();
            $stmt->close();
        }

        private function obtenerPrecioRecurso($idRecursoTuristico)
        {
            $sql = "SELECT precio FROM recurso_turistico WHERE id_recurso = ?";
            $stmt = $this->conn->prepare($sql);
            $stmt->bind_param("i", $idRecursoTuristico);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            $precio = $row['precio'];
            $stmt->close();
            return $precio;
        }
        public function cerrarConexion(){
            $this->conn->close();
        }
    }