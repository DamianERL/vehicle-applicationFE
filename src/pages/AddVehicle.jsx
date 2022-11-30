import React, { useState } from "react";
import Form from "react-bootstrap/Form";

import { BsFillFolderFill } from "react-icons/bs";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { API } from "../config/api";

export default function AddVehicle() {
  const navigate = useNavigate();
  const [form, setForm] = useState("");

  document.title = "AddVehicle";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const res = await API.post("/vehicle-data", form);
      swal("Good job!", "Add Data Success!", "success");
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  });

  return (
    <>
      <form onSubmit={(e) => handleSubmit.mutate(e)}>
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
                required
                name="registration_number"
                onChange={handleChange}
                className="mb-3"
                id="regis"
                type="text"
              />
              <Form.Label className=" fw-semibold mb-0 ms-1" htmlFor="owner">
                Nama Pemilik
              </Form.Label>
              <Form.Control
                required
                name="owner"
                onChange={handleChange}
                id="owner"
                className="mb-3"
                type="text"
              />
              <Form.Label className=" fw-semibold mb-0 ms-1" htmlFor="brand">
                Merk Kendaraan
              </Form.Label>
              <Form.Control
                name="vehicle_brand"
                onChange={handleChange}
                id="brand"
                className="mb-3"
                type="text"
              />
              <Form.Label className=" fw-semibold mb-0 ms-1" htmlFor="address">
                Alamat Pemilik Kendaraan
              </Form.Label>
              <Form.Control
                name="owner_address"
                onChange={handleChange}
                id="address"
                as="textarea"
                style={{ resize: "none", height: "100px" }}
              />
            </div>
            <div style={{ width: "350px" }}>
              <Form.Label className=" fw-semibold mb-0 ms-1" htmlFor="years">
                Tahun Pembuatan
              </Form.Label>
              <Form.Control
                id="years"
                name="production_year"
                onChange={handleChange}
                maxLength="4"
                className="mb-3"
                type="numeric"
              />
              <Form.Label htmlFor="cylinder" className=" fw-semibold mb-0 ms-1">
                Kapasitas Silinder
              </Form.Label>
              <Form.Control
                id="cylinder"
                name="cylinder_capacity"
                onChange={handleChange}
                type="numeric"
                className="mb-3"
              />
              <Form.Label
                htmlFor="vehicle_color"
                className=" fw-semibold mb-0 ms-1"
              >
                Warna Kendaraan
              </Form.Label>
              <Form.Select
                id="vehicle_color"
                onChange={handleChange}
                name="vehicle_color"
              >
                <option hidden></option>
                <option value="Merah">Merah</option>
                <option value="Hitam">Hitam</option>
                <option value="Biru">Biru</option>
                <option value="Abu-Abu">Abu-Abu</option>
              </Form.Select>
              <Form.Label
                htmlFor="fuell"
                className="mt-3 fw-semibold mb-0 ms-1 fw-semibold"
              >
                Bahan Bakar
              </Form.Label>
              <Form.Control
                id="fuell"
                name="fuel"
                onChange={handleChange}
                type="text"
              />
            </div>
          </div>
          <div className=" d-flex gap-2 mt-4 me-4 mb-3">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "120px" }}
            >
              Simpan
            </button>
            <Link to="/">
              <button className="btn btn-primary" style={{ width: "120px" }}>
                Kembali
              </button>
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}
