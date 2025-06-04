import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser } from "../../store/actions/userActions";
import { useNavigate } from "react-router-dom";
import NavbarPanel from "../components/NavBar";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Spinner,
} from "@material-tailwind/react";

const UsersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.user?.role);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const { user } = useSelector((state) => state.auth);
  const { users, loading, error, totalPages } = useSelector((state) => state.users);

  useEffect(() => {
    if (user?.role === "superadmin") {
      dispatch(getUsers(currentPage, limit));
    }
  }, [dispatch, user, currentPage]);

  const handleEdit = (id) => navigate(`/admin/users/edit/${id}`);
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id)).then(() => dispatch(getUsers(currentPage, limit)));
    }
  };

  const isSuperadmin = user?.role === "superadmin";

  if (!isSuperadmin) {
    return (
      <div className="flex flex-col min-h-screen bg-red-50">
        <NavbarPanel role={role} />
        <div className="flex justify-center items-center flex-grow">
          <Typography variant="h5" color="red">
            Access denied: Only superadmin can view this page.
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-50">
      <NavbarPanel role={role} />
      <div className="flex justify-center px-4 pt-10">
        <Card className="w-full max-w-5xl">
          <CardBody>
            <Typography variant="h4" className="mb-6 text-center text-blue-900">
              User Management
            </Typography>

            {loading ? (
              <div className="flex justify-center">
                <Spinner />
              </div>
            ) : error ? (
              <Typography color="red">{error}</Typography>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-blue-50">
                        {["Name", "Email", "Role", "Actions"].map((h) => (
                          <th key={h} className="py-2 px-4 border-b">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {users?.map((u) => (
                        <tr key={u._id} className="hover:bg-blue-50">
                          <td className="py-2 px-4 border-b">{u.name}</td>
                          <td className="py-2 px-4 border-b">{u.email}</td>
                          <td className="py-2 px-4 border-b capitalize">{u.role}</td>
                          <td className="py-2 px-4 border-b space-x-2">
                            <Button size="sm" color="blue" onClick={() => handleEdit(u._id)}>
                              Edit
                            </Button>
                            <Button size="sm" color="red" onClick={() => handleDelete(u._id)}>
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-center mt-6 gap-4">
                  <Button
                    variant="outlined"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    Previous
                  </Button>
                  <Typography className="self-center">
                    Page {currentPage} of {totalPages}
                  </Typography>
                  <Button
                    variant="outlined"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
export default UsersPage;
