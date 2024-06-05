import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button as PrimeButton } from "primereact/button";
import { PanelMenu } from "primereact/panelmenu";
import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/authContext"; // Comentado
// import logo from "../assets/Borcelle.png"; // Comentado
import { AppBar, Box, Container, Toolbar, Typography, Button as MuiButton } from "@mui/material";

export default function CombinedComponent() {
  const [visible, setVisible] = useState(false);
  // const { isAuthenticated, logout, user } = useAuth(); // Comentado
  const navigate = useNavigate();

  const items = [
    {
      label: "Gestion de Usuario",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: <Link to="/users">Usuario</Link>,
          icon: "pi pi-fw pi-user-plus",
          style: {
            backgroundColor: 'var(--bluegray-400)', // Estilo de fondo
            color: "white", // Color del texto
            fontSize: "16px", // Tamaño de fuente
          },
        },
        {
          label: <Link to="/funcionalidades">Funcionalidad</Link>,
          icon: "pi pi-fw pi-user-plus",
          style: {
            backgroundColor: 'var(--bluegray-400)', // Estilo de fondo
            color: "white", // Color del texto
            fontSize: "16px", // Tamaño de fuente
          },
        },
        {
          label: <Link to="/roles">Rol</Link>,
          icon: "pi pi-fw pi-user-plus",
          style: {
            backgroundColor: 'var(--bluegray-400)', // Estilo de fondo
            color: "white", // Color del texto
            fontSize: "16px", // Tamaño de fuente
          },
        },
        {
            label: <Link to="/flotas">Flota</Link>,
            icon: "pi pi-fw pi-user-plus",
            style: {
              backgroundColor: 'var(--bluegray-400)', // Estilo de fondo
              color: "white", // Color del texto
              fontSize: "16px", // Tamaño de fuente
            },
          },
          {
            label: <Link to="/choferes">Chofer</Link>,
            icon: "pi pi-fw pi-user-plus",
            style: {
              backgroundColor: 'var(--bluegray-400)', // Estilo de fondo
              color: "white", // Color del texto
              fontSize: "16px", // Tamaño de fuente
            },
          },
      ],
    },
    {
      label: "Gestion de Viaje",
      icon: "pi pi-fw pi-ticket",
      items: [
        {
          label: <Link to="/viajes">Viaje</Link>,
          icon: "pi pi-fw pi-plus",
        },
        {
          label: <Link to="/lugar">Lugar</Link>,
          icon: "pi pi-fw pi-plus",
        },
        {
          label: <Link to="/proveedores">/</Link>,  
          icon: "pi pi-fw pi-plus",
        },
        {
          label: <Link to="/inventarios">/</Link>,
          icon: "pi pi-fw pi-plus",
        },
        {
          label: <Link to="/nota-de-entrada">/</Link>,
          icon: "pi pi-fw pi-plus",
        },
        {
          label: <Link to="/facturas">/</Link>,
          icon: "pi pi-fw pi-plus",
        },
      ],
    },
    {
      label: "Gestion de Boletos",
      icon: "pi pi-fw pi-bolt",
      items: [
        {
          label: <Link to="/disciplinas">/</Link>,
          icon: "pi pi-fw pi-plus",
        },
        {
          label: <Link to="/horario">/</Link>,
          icon: "pi pi-fw pi-plus",
        },
        {
          label: <Link to="/entrenador">/</Link>,
          icon: "pi pi-fw pi-plus",
        },{
          label: <Link to="/cliente">/</Link>,
          icon: "pi pi-fw pi-plus",
        },
        {
          label: <Link to="/membresia">/</Link>,
          icon: "pi pi-fw pi-plus",
        },
      ],
    }
    // {
    //   label: "Reportes",
    //   icon: "pi pi-fw pi-chart-bar",
    //   items: [
    //     {
    //       label: <Link to="/reporteentrada">Nota De Entrada</Link>,
    //       icon: "pi pi-fw pi-plus",
    //     },
    //     {
    //       label: <Link to="/reportefactura">Facturas</Link>,
    //       icon: "pi pi-fw pi-plus",
    //     },
    //     {
    //       label: <Link to="/reporteclimem">Membresias</Link>,
    //       icon: "pi pi-fw pi-plus",
    //     },
    //     {
    //       label: <Link to="/bitacora">Bitacora</Link>,
    //       icon: "pi pi-fw pi-plus",
    //     },
    //   ],
    // }
  ];

  
  const sidebarStyle = {
    backgroundColor: '#151623',
    //  backgroundColor: '#151623',
    width: '20%' // Establece el ancho a una quinta parte de la página
  };
  return (
    <div>
    
      <div className="card flex justify-content-between" style={sidebarStyle}>
        <Sidebar style={sidebarStyle} visible={visible} onHide={() => setVisible(false)}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* <img
              src={logo}
              style={{
                width: "50%",
                borderRadius: "50%", // Imagen circular
                background: "transparent", // Fondo de la imagen transparente
              }}
              alt="Descripción de la imagen"
            /> */}
            <br />
          </div>
          <PanelMenu
            model={items}
            className="w-full md:w-18rem"
            style={{ background: "black", padding: "10px", borderRadius: "15px" }}
          />
        </Sidebar>
        <PrimeButton
          icon="pi pi-arrow-right"
          style={{ color: "orange" }}
          onClick={() => setVisible(true)}
          className="bg-black-alpha-90"
        />
        <div className="flex align-items-center">
          {/* <i style={{ color: "white", fontWeight: "bold" ,fontSize:"25px",marginRight:"20px"}}>Welcome {user.username}</i> */}
          {/* <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem", marginRight: "20px" }}></i> */}
          {/* <i className="pi pi-spin pi-cog" style={{ fontSize: "2rem", marginRight: "20px" }}></i> */}
          <i style={{ fontSize: "2rem", background: "orange", borderRadius: "10px" }}>
            <Link to="/" onClick={() => /* logout() */ {}} style={{ fontSize: "2rem" }}>
            .
            </Link>
          </i>
        </div>
      </div>
    </div>
  );
}
