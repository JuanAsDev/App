import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const [itemData, setItemData] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    UserId: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/items/create", itemData);

      Swal.fire({
        title: "Success",
        text: "Data has been added successfully!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (error) {
      console.error("Error adding item: ", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while adding the item.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="container">
      <h3>Tambah Item</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nama</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={itemData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Kategori</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={itemData.category}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Harga</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={itemData.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Stok</label>
          <input
            type="number"
            className="form-control"
            name="stock"
            value={itemData.stock}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">UserId</label>
          <input
            type="text"
            className="form-control"
            name="UserId"
            value={itemData.UserId}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Tambah Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;
