import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useMutation } from "react-query";

import { BsFillFolderFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../config/api";
import swal from "sweetalert";
export default function AddVehicle() {
  const navigate = useNavigate();
  document.title = "EditVehicle";
  const { id } = useParams();



  const [form, setForm] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  let getData = async () => {
    const res = await API.get("/vehicle-data/" + id);
    setForm({
      ...form,
      registration_number: res.data.registration_number,
      owner: res.data.owner,
      vehicle_brand: res.data.vehicle_brand,
      owner_address: res.data.owner_address,
      production_year: res.data.production_year,
      cylinder_capacity: res.data.cylinder_capacity,
      vehicle_color: res.datavehicle_color,
      fuel: res.data.fuel,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const res = await API.patch("/vehicle-data", form);
    } catch (error) {
      console.log(error);
    }
    swal("Good job!", "Edit Data Success!", "success");
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
                name="registration_number"
                defaultValue={form?.registration_number}
                onChange={handleChange}
                className="mb-3"
                id="regis"
                type="text"
              />
              <Form.Label className=" fw-semibold mb-0 ms-1" htmlFor="owner">
                Nama Pemilik
              </Form.Label>
              <Form.Control
                name="owner"
                defaultValue={form?.owner}
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
                defaultValue={form?.vehicle_brand}
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
                defaultValue={form?.owner_address}
                onChange={handleChange}
                id="address"
                as="textarea"
                style={{ resize: "none", height: "100px" }}
              />
            </div>
            <div style={{ width: "350px" }}>
              <Form.Label htmlFor="years" className=" fw-semibold mb-0 ms-1">
                Tahun Pembuatan
              </Form.Label>
              <Form.Control
                id="years"
                name="production_year"
                defaultValue={form?.production_year}
                onChange={handleChange}
                maxLength="4"
                className="mb-3"
                type="numeric"
              />
              <Form.Label htmlFor="silinder" className=" fw-semibold mb-0 ms-1">
                Kapasitas Silinder
              </Form.Label>
              <Form.Control
                id="silinder"
                name="cylinder_capacity"
                defaultValue={form?.cylinder_capacity}
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
                defaultValue={form?.vehicle_color}
                name="vehicle_color"
              >
                <option hidden value=""></option>
                <option value="Merah">Merah</option>
                <option value="Hitam">Hitam</option>
                <option value="Biru">Biru</option>
                <option value="Abu-Abu">Abu-Abu</option>
              </Form.Select>
              <Form.Label
                htmlFor="fuel"
                className="mt-3 fw-semibold mb-0 ms-1 fw-semibold"
              >
                Bahan Bakar
              </Form.Label>
              <Form.Control
                id="fuel"
                defaultValue={form?.fuel}
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
