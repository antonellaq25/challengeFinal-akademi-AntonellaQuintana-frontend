import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourseDetail, updateCourse } from "../../store/actions/courseActions";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
  Textarea,
  Spinner,
} from "@material-tailwind/react";

const EditCoursePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

const { loading, error, course } = useSelector((state) => state.courseDetail);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [active, setActive] = useState(true);

  useEffect(() => {
    dispatch(getCourseDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
  if (course) {
    setTitle(course.title || "");
    setDescription(course.description || "");
    setCategory(course.category || "");
    setPrice(course.price || "");
    setActive(course.active ?? true);
  }
}, [course]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCourse = {
      title,
      description,
      category,
      price: Number(price),
      active,
    };

    dispatch(updateCourse(id, updatedCourse)).then(() => {
      navigate("/teacher/courses");
    });
  };

  if (loading || !course) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-green-50 px-4 pt-10">
      <Card className="w-full max-w-lg">
        <CardBody>
          <Typography variant="h4" color="blue-gray" className="mb-6 text-center">
            Editar Curso
          </Typography>

          {error && <Typography color="red">{error}</Typography>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Textarea
              label="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Input
              label="Categoría"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <Input
              label="Precio"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={active}
                onChange={() => setActive(!active)}
                id="active-checkbox"
              />
              <label htmlFor="active-checkbox">Activo</label>
            </div>

            <Button type="submit" color="amber" disabled={loading}>
              {loading ? "Actualizando..." : "Actualizar Curso"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default EditCoursePage;
