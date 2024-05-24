import { NavLink, useNavigate } from "react-router-dom";
import classNames from "classnames";
import { HiOutlineMenu, HiMenuAlt1 } from "react-icons/hi";
import { Fragment, useState } from "react";
import useAuth from "../../hooks/use-auth";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { setUserData, userData } = useAuth();

  // console.log(userData);

  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setUserData(null);
    localStorage.removeItem("Authorization");
    navigate("/login");
    toast.success("Logged out Successfully", {
      duration: 3000,
      className: "text-success px-5 fw-bolder my-3",
    });
    setIsOpen(false);
  };

  const linkClassNames =
    "w-full flex items-center justify-center p-[10px] text-nowrap rounded-full bg-white shadow-md text-purple-700 hover:bg-purple-700 hover:text-white transition-all";

  const isActiveLinkClassNames = "!bg-purple-700 !text-white";

  return (
    <nav className="sticky top-0 z-10 p-[20px] bg-gradient-to-tl from-[#1c1c5a] to-[rgb(139,128,128)]">
      <div className="container mx-auto">
        {localStorage.getItem("Authorization") ? (
          <Fragment>
            <div
              className={`absolute top-full -left-full w-full h-screen md:h-full bg-gradient-to-tl from-[#1c1c5a] to-[rgb(139,128,128)] md:bg-none z-50 p-[20px] md:p-0 md:static flex items-center justify-center md:justify-between flex-col md:flex-row transition-all ${
                isOpen && "!left-0"
              }`}
            >
              <ul className="w-full flex items-center flex-col md:flex-row">
                <li className="mb-4 md:mr-4 md:mb-0 w-full md:w-fit">
                  <NavLink
                    to="/todos"
                    className={({ isActive }) =>
                      classNames(linkClassNames, {
                        [isActiveLinkClassNames]: isActive,
                      })
                    }
                  >
                    Your Todos
                  </NavLink>
                </li>
                <li className="mb-4 md:mr-4 md:mb-0 w-full md:w-fit">
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      classNames(linkClassNames, {
                        [isActiveLinkClassNames]: isActive,
                      })
                    }
                  >
                    Profile
                  </NavLink>
                </li>
              </ul>

              <div className="w-full md:w-fit flex items-center flex-col md:flex-row justify-center">
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    classNames(linkClassNames, {
                      [isActiveLinkClassNames]: isActive,
                    })
                  }
                >
                  Welcome {userData?.firstName}{" "}
                  <div className="text-xl ml-4">
                    <FaUserCircle />
                  </div>
                </NavLink>

                <button
                  className={`mt-4 md:mt-0 md:ml-4 ${linkClassNames}`}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end py-[10px] text-2xl text-white md:hidden">
              {isOpen ? (
                <HiMenuAlt1
                  className="cursor-pointer hover:text-yellow-400 transition-all"
                  onClick={() => setIsOpen(!isOpen)}
                />
              ) : (
                <HiOutlineMenu
                  className="cursor-pointer hover:text-yellow-400 transition-all"
                  onClick={() => setIsOpen(!isOpen)}
                />
              )}
            </div>
          </Fragment>
        ) : (
          <ul className="flex items-center justify-center">
            <li className="mr-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  classNames(linkClassNames, {
                    [isActiveLinkClassNames]: isActive,
                  })
                }
              >
                Register
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  classNames(linkClassNames, {
                    [isActiveLinkClassNames]: isActive,
                  })
                }
              >
                Login
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
