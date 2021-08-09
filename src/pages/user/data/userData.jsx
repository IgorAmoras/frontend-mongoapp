import React, { useState, useEffect, useRef } from "react";
import Badge from "react-bootstrap/Badge";
import getUser, { setUser } from "../../../utils/getCurrentUser";
import { deleteProject, getProjects } from "../../../utils/requestHandler";
import "./userData.css";
import Toast from "./toastMessage";
import { deleteUser, updateUser } from "../../../utils/requestHandler";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
let aux = 0;

export default function UserData() {
  const [user, setDefaultUser] = useState({
    name: "",
    permissions: "",
    email: "",
  });
  const [defaultData, setDefaultData] = useState();
  const [deleted, setDeleted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("Há algo de errado");
  const [projects, setProjects] = useState([]);
  const history = useHistory();
  const [clickMap, setClickMap] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });

  let clicked = 0;

  useEffect(async () => {
    const sysUser = getUser();
    console.log(sysUser);
    setDefaultUser(sysUser.user);
    setDefaultData(sysUser.user);
    try {
      const { data } = await getProjects(sysUser);
      console.log(data);
      setProjects(data.projects);
      debugger;
    } catch (err) {
      console.log(err);
    }
  }, []);

  const parsePermission = (pTypes) => {
    if (pTypes === "admin") {
      return "ADMINISTRADOR";
    }
    return "FUNCIONÁRIO";
  };

  const click = (index) => {
    setClickMap((prev) => ({ ...prev, [index]: true }));
  };

  const unclick = () => {
    const controlState = {};
    for (let i = 1; i < 5; i++) {
      controlState[i] = false;
    }
    setClickMap(controlState);
  };

  const toggleShow = () => setShowToast(!showToast);

  const handleUpdate = async () => {
    console.log({ user, token: user.token });
    if (user === defaultData) {
      setToastMessage("Você não alterou seu usuário!");
      toggleShow();
      return;
    }
    try {
      await updateUser(user);
      setUser({ user, token: user.token });
      setToastMessage("Usuário alterado com sucesso!");
      toggleShow();
    } catch (err) {
      setToastMessage("Houve um erro... :(");
      console.error(err);
      toggleShow();
    }
  };

  return (
    <div className="user-data" onClick={unclick}>
      <Toast
        show={showToast}
        toggleShow={toggleShow}
        toastMessage={toastMessage}
      />
      <div className="user-center">
        <h1 style={{ color: "white", alignSelf: "center" }}>
          Seus dados pessoais
        </h1>
        <div className="inner-section">
          <div>
            {clickMap[1] ? (
              <p className="hidden-text">Insira seu novo nome</p>
            ) : null}
            <div
              onClick={(e) => {
                e.stopPropagation();
                unclick();
                click(1);
              }}
              className="upper-left"
            >
              <h4>
                <Badge className="Badge" bg="danger">
                  NOME
                </Badge>
                {clickMap[1] ? (
                  <input
                    onKeyPress={(e) => {
                      if (e.key === "Enter") unclick();
                    }}
                    value={`${user.name}`}
                    onChange={(e) => {
                      setDefaultUser((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }));
                    }}
                    type="text"
                  />
                ) : (
                  user.name
                )}
              </h4>
            </div>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              unclick();
              click(2);
              if (user.permissions === "admin") {
                setToastMessage("Você já é administrador!");
                toggleShow();
                return;
              }
              setToastMessage("Você não tem permissão para isso!");
              toggleShow();
              return;
            }}
            className="upper-rigth"
          >
            <h4>
              <Badge className="Badge" bg="danger">
                POSIÇÃO
              </Badge>
              {parsePermission(user.permissions)}
            </h4>
          </div>
        </div>
        <div className="inner-section">
          <div
            onClick={(e) => {
              e.stopPropagation();
              aux++;
              unclick();
              click(3);
              setToastMessage("Deseja ver seus projetos? Clique novamente");
              toggleShow();
              if (aux > 1) {
                history.push("/projects");
                aux = 0;
              }
            }}
            className="lower-left"
          >
            <h4>
              <Badge className="Badge" bg="danger">
                Projetos totais{" "}
              </Badge>
              {projects.length}
            </h4>
          </div>
          <div>
            {clickMap[4] ? (
              <p className="hidden-text">Insira seu novo e-mail</p>
            ) : null}
            <div
              onClick={(e) => {
                e.stopPropagation();
                unclick();
                click(4);
              }}
              className="lower-rigth"
            >
              <h4>
                <Badge className="Badge" bg="danger">
                  EMAIL
                </Badge>
                {clickMap[4] ? (
                  <input
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        if (!user.email.includes("@")) {
                          setToastMessage("Seu email está inválido!");
                          setDefaultUser((prev) => ({
                            ...prev,
                            email: defaultData.email,
                          }));
                          toggleShow();
                          return;
                        }
                        unclick();
                      }
                    }}
                    onChange={(e) => {
                      setDefaultUser((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }));
                    }}
                    type="text"
                  />
                ) : (
                  user.email
                )}
              </h4>
            </div>
          </div>
        </div>
        <div className="button-out">
          <Button
            variant="outline-info"
            onClick={() => {
              history.push("/home");
            }}
          >
            Voltar
          </Button>
          <Button
            variant="outline-light"
            onClick={() => {
              window.localStorage.removeItem("user");
              setToastMessage("Tchau tchau...");
              toggleShow();
              setTimeout(() => {
                history.push("/home");
              }, 2000);
            }}
          >
            Deslogar
          </Button>
          <Button
            variant="outline-warning"
            onClick={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            Alterar usuário
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => {
              setDeleted(true);
              setToastMessage("Você tem certeza? :(");
              toggleShow();
              aux++;
              if (aux > 1) {
                deleteUser(user);
                window.localStorage.removeItem("user");
                history.push("/home");
              }
            }}
          >
            {deleted ? "sim, quero deletar" : "deletar usuário"}
          </Button>
        </div>
      </div>
    </div>
  );
}
