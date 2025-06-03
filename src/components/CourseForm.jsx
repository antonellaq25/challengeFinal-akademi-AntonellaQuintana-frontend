import { useState, useEffect } from "react";

const CourseForm = ({ onSubmit, initialValues = {} }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    maxStudents: "",
    ...initialValues,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
      <input name="price" value={formData.price} onChange={handleChange} type="number" placeholder="Price" />
      <input name="maxStudents" value={formData.maxStudents} onChange={handleChange} type="number" placeholder="Max. students" />
      <button type="submit">Save</button>
    </form>
  );
};

export default CourseForm;
