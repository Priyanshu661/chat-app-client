import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useReducer } from "react";
import { useRouter } from "next/router";
import Header from "@/components/Header/Header";
import ChatWindow from "@/components/ChatWindow/ChatWindow";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);
  return (
    <>
      <Header />

      <div>
        <ChatWindow />
      </div>
    </>
  );
}
