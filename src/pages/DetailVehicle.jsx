import React from "react";
import Form from "react-bootstrap/Form";

import { BsFillFolderFill } from "react-icons/bs";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { API } from "../config/api";

export default function AddVehicle() {
  const { id } = useParams();

  let { data: vehicle } = useQuery("vehiclecahche", async () => {
    const res = await API.get("/vehicle-data/" + id);
    return res.data;
  });


  return (
    <>
      <div className="m-4 ">
        <div className="  fs-1   ">
          <BsFillFolderFill style={{ color: "#6ACBF8" }} />
          <p className="fs-4 ms-2 fw-bold">Applikasi Data Kendaraan</p>
        </div>
        <div className="d-flex  " style={{ gap: "90px" }}>
          <div style={{ width: "350px" }}>
            <Form.Label className="  fw-semibold mb-0 ms-1" htmlFor="regis">
              No. Registrasi Kendaraan
            </Form.Label>
            <Form.Control
              value={vehicle?.registration_number}
              className="mb-3"
              id="regis"
              type="text"
            />
            <Form.Label className=" fw-semibold mb-0 ms-1" htmlFor="owner">
              Nama Pemilik
            </Form.Label>
            <Form.Control
              value={vehicle?.owner}
              id="owner"
              className="mb-3"
              type="text"
            />
            <Form.Label className=" fw-semibold mb-0 ms-1" htmlFor="brand">
              Merk Kendaraan
            </Form.Label>
            <Form.Control
              value={vehicle?.vehicle_brand}
              id="brand"
              className="mb-3"
              type="text"
            />
            <Form.Label className=" fw-semibold mb-0 ms-1" htmlFor="address">
              Alamat Pemilik Kendaraan
            </Form.Label>
            <Form.Control
              value={vehicle?.owner_address}
              id="address"
              as="textarea"
              style={{ resize: "none", height: "100px" }}
            />
          </div>
          <div style={{ width: "350px" }}>
            <Form.Label htmlFor="years" className="fw-semibold mb-0 ms-1">
              Tahun Pembuatan
            </Form.Label>
            <Form.Control
            id="years"
              value={vehicle?.production_year}
              min="0"
              max="9999"
              className="mb-3"
              type="numeric"
            />
            <Form.Label htmlFor="Silinder" className=" fw-semibold mb-0 ms-1">
              Kapasitas Silinder
            </Form.Label>
            <Form.Control
            id="Silinder"
              value={vehicle?.cylinder_capacity}
              type="number"
              className="mb-3"
            />
            <Form.Label htmlFor="vehicle_color" style={{ fontWeight: "bold" }}>
              Warna Kendaraan
            </Form.Label>
            <Form.Select id="vehicle_color" name="vehicle_color" disabled>
              <option value="">{vehicle?.vehicle_color}</option>
            </Form.Select>
            <Form.Label htmlFor="fuels" className="mt-3 fw-semibold mb-0 ms-1 fw-semibold">
              Bahan Bakar
            </Form.Label>
            <Form.Control 
            id="fuels"
              value={vehicle?.fuel}
            type="text" />
          </div>
        </div>
        <div className=" d-flex gap-2 mt-4 me-4 mb-3">
          <Link to="/">
            <button className="btn btn-primary" style={{ width: "120px" }}>
              Kembali
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
