import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../src/components/header";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

// Mock `next/link`
jest.mock("next/link", () => {
  const Link = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  Link.displayName = "NextLink"; // Ajout de la displayName pour ESLint
  return Link;
});

// Mock`next/router` pour les tests
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));


const mockStore = configureStore([]);

describe("Header Component", () => {

const initialState = {
	auth: {
	  isAuthenticated: false, 
	},
  };

  // Create a mock store with the initial state
  const store = mockStore(initialState);


  test("renders the logo with correct alt text", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // Vérifie que le logo est présent avec le bon texte alternatif
    const logoImage = screen.getByAltText("Autolog logo"); // Utilise `alt` pour cibler l'image
    expect(logoImage).toBeInTheDocument(); // Vérifie que le logo est dans le document
    expect(logoImage).toHaveAttribute("src", "logo.svg"); // Vérifie le chemin du logo
  });

  test("has a link that directs to the root path", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // Vérifie la présence du lien vers la racine
    const rootLink = screen.getByRole("link", { name: "Autolog logo" }); // Utilise le texte ou l'attribut `name`
    expect(rootLink).toBeInTheDocument();
    expect(rootLink).toHaveAttribute("href", "/"); // Vérifie que le lien a l'attribut `href` vers `/`
  });

  test("renders the black logo if user is authenticated", () => {
    const initialState = {
      auth: {
        isAuthenticated: true,
      },
    };

    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // Vérifie que le logo est présent avec le bon texte alternatif
    const logoImage = screen.getByAltText("user not connected logo"); // Utilise `alt` pour cibler l'image
    expect(logoImage).toBeInTheDocument(); // Vérifie que le logo est dans le document
    expect(logoImage).toHaveAttribute("src", "user_black.svg"); // Vérifie le chemin du logo
  });

  test("renders the white logo if user is not authenticated", () => {
    const initialState = {
      auth: {
        isAuthenticated: false,
      },
    };

    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    // Vérifie que le logo est présent avec le bon texte alternatif
    const logoImage = screen.getByAltText("user not connected logo"); // Utilise `alt` pour cibler l'image
    expect(logoImage).toBeInTheDocument(); // Vérifie que le logo est dans le document
    expect(logoImage).toHaveAttribute("src", "user_white.svg"); // Vérifie le chemin du logo
  });
});
