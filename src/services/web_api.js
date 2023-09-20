const usersData = [
  { id: 1, email: "joao@gmail.com", password: "joao", nome: "João", idade: 20 },
  {
    id: 2,
    email: "maria@gmail.com",
    password: "maria",
    nome: "Maria",
    idade: 22,
  },
  //usuario
  {
    id: 3,
    email: "pedro@gmail.com",
    password: "pedro",
    nome: "Pedro",
    idade: 21,
  },
  //O brabo eo adm
  {
    id: 4,
    email: "obrabo@brabissimo.com",
    password: "Brabo",
    nome: "Rocha",
    idade: 21,
    is_admin: 1,
  },
];

const feedbackData = localStorage.getItem("feedbackData")
  ? JSON.parse(localStorage.getItem("feedbackData"))
  : [];

const getUsers = async (id) => {
  if (id) return usersData.find((user) => user.id === parseInt(id, 10));

  return usersData;
};
const userAutorize = async (email, password) => {
  const ret = usersData.find(
    (user) => user.email === email && user.password == password
  );
  localStorage.setItem("is_admin", parseInt(ret.is_admin));
  console.log(ret);
  return !(ret === undefined);
};
const addFeedback = async (
  id,
  user_name,
  classificacao,
  title,
  description
) => {
  feedbackData.push({
    id: id,
    user_name: user_name,
    classificacao: classificacao,
    title: title,
    description: description,
  });
  localStorage.setItem("feedbackData", JSON.stringify(feedbackData));
};
const getFeedbacks = async () => {
  return feedbackData;
};
export { getUsers, userAutorize, addFeedback, getFeedbacks };
