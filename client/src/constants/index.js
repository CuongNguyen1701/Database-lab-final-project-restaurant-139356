import { cuong, hnam, pnam, anon, thanh, hadinh } from "../assets";

const members = [
  {
    name: "Nguyen Truc Cuong",
    image: cuong,
    role: "Front-end Developer",
    description:
      "Sophomore student at Hanoi University of Science and Technology, majoring in Computer Science. I'm proficient in English and currently learning Japanese as my third language. I'm also really interested in Machine Learning and Data Science.",
  },
  {
    name: "Le Phuong Nam",
    image: pnam,
    role: "Front-end Developer",
    description:
      "Sophomore student at Hanoi University of Science and Technology, majoring in Computer Science",
  },
  {
    name: "Tran Duc Hoang Nam",
    image: hnam,
    role: "Back-end Developer",
    description:
      "Sophomore student at Hanoi University of Science and Technology, majoring in Computer Science",
  },
];

export const navLinks = [
  {
    id: "home",
    title: "HOME",
    pathname: "/",
  },
  {
    id: "menu",
    title: "MENU",
    pathname: "/menu",
  },
  {
    id: "about",
    title: "ABOUT",
    pathname: "/about",
  },
  {
    id: "book table",
    title: "BOOK TABLE",
    pathname: "/book-table",
  },
];

export const adminNavLinks = [
  {
    id: "admin",
    title: "ADMIN",
    pathname: "/admin",
  },
];

export { members };
