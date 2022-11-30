import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";

import { BsFillFolderFill } from "react-icons/bs";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
export default function Index() {
  document.title = "Dashboard";
  let navigate = useNavigate();

  const handleUpdate = (id) => {
    navigate("/edit-vehicle/" + id);
  };
  const handleDetail = (id) => {
    navigate("/detail-vehicle/" + id);
  };

  let { data: vehicleData, refetch } = useQuery("vehicleData", async () => {
    const response = await API.get("/vehicle-data");
    return response.data;
  });

  const handleDelete = useMutation(async (id) => {
    try {
      await API.delete(`/vehicle-data/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  const [filter, setFilter] = useState("");
  let searchData = (e) => {
    setFilter(e.target.value);
  };

  let dataFilter =vehicleData?.filter((item)=>{
    if (filter === ""){
      return item;
    }else if(
      item.registration_number.toLowerCase().includes(filter.toLowerCase())
    ){
      return item; 
    } else if(item.owner.toLowerCase().includes(filter.toLowerCase())){
      return item
    }
    
  })


  return (
    <>
      <div className="m-5 ">
        <div className="d-flex align-text-center fs-1   ">
          <BsFillFolderFill style={{ color: "#6ACBF8" }} />
          <p className="fs-4 ms-2  fw-bold ">Applikasi Data Kendaraan</p>
        </div>
        <div className="p-4 rounded" style={{ backgroundColor: "#FCE4D6",height:"200px" }}>
          <Form.Label htmlFor="nameowner" className="ms-2 mt-3 fw-bold mb-0">
            Nama & No Registrasi
          </Form.Label>
          <Form.Control
            style={{ width: "400px" }}
            type="search"
            onChange={searchData.bind(this)}
            id="nameowner"
            placeholder="search . . ."
          />
          
        </div>
        <div className=" d-flex justify-content-end gap-2 mt-4 me-4 mb-3">
          <button
            onClick={() => navigate("/add-vehicle")}
            className="btn btn-primary"
            style={{ width: "140px" }}
          >
            Add
          </button>
        </div>
        <table className="table text-center table-bordered border-dark font ">
          <thead style={{ backgroundColor: "#B4C6E7" }}>
            <tr>
              <th scope="col">No</th>
              <th scope="col">No Registrasi</th>
              <th scope="col">Nama Pemilik</th>
              <th scope="col">Merk Kendaraan</th>
              <th scope="col">Tahun Pembuatan</th>
              <th scope="col">Kapasitas</th>
              <th scope="col">Warna</th>
              <th scope="col">Bahan Bakar</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataFilter?.map((item, index) => (
              <tr className="fw-semibold" key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.registration_number}</td>
                <td>{item.owner}</td>
                <td>{item.vehicle_brand}</td>
                <td>{item.production_year}</td>
                <td>{item.cylinder_capacity}cc</td>
                <td>{item.vehicle_color}</td>
                <td>{item.fuel}</td>
                <td>
                  <div className="d-flex gap-2 justify-content-center  ">
                    <p
                      onClick={() => handleDetail(item.id)}
                      style={{ color: "#CD6121", cursor: "pointer" }}
                    >
                      Detail
                    </p>
                    <p
                      onClick={() => handleUpdate(item.id)}
                      style={{ color: "#546CA0", cursor: "pointer" }}
                    >
                      Edit
                    </p>
                    <p
                      onClick={() => handleDelete.mutate(item.id)}
                      style={{ color: "#FF101D", cursor: "pointer" }}
                    >
                      Delete
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
