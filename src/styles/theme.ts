import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        color: "#1B1A21",
        lineHeight: "base",
        minHeight: "100%",
      },
    },
  },
  colors: {
    brand: {
      400: "#C81CC5",
      500: "#DA18A3",
      600: "#EB1484",
    },
    gray: {
      200: "#E3E1E3",
      400: "#888888",
      600: "#4F4F4F",
    },
    black: {
      100: "#E3E1E3",
      200: "#2D2E36",
      300: "#1B1A21",
      400: "#24252D",
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "10px",
        lineHeight: "base",
      },
      variants: {
        primary: {
          bgGradient: "linear(to-r, brand.600, brand.400)",
          color: "white",
          _hover: {
            bgGradient: "linear(to-r, brand.500, brand.400)",
            _disabled: {
              bgGradient: "linear(to-r, brand.500, brand.400)",
            },
          },
          _active: {
            bgGradient: "linear(to-r, brand.500, brand.400)",
          },
        },
        outline: {
          color: "brand.500",
          borderColor: "brand.500",
        },
        link: {
          _hover: {
            textDecoration: "none",
          },
        },
      },
      sizes: {
        md: {
          px: "30px",
          py: "9px",
          height: "auto",
          minW: "auto",
          fontSize: "sm",
        },
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          borderRadius: "20px",
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderRadius: "10px",
            borderColor: "gray.400",
            _hover: {
              borderColor: "brand.500",
            },
            _disabled: {
              borderColor: "gray.400",
            },
            _focus: {
              borderColor: "brand.500",
              boxShadow: `0 0 0 1px #DA18A3}`,
            },
          },
        },
      },
      sizes: {
        lg: {
          field: {
            h: "60px",
            px: "29px",
          },
        },
      },
    },
    Textarea: {
      variants: {
        outline: {
          borderRadius: "10px",
          borderColor: "gray.400",
          _hover: {
            borderColor: "brand.500",
          },
          _disabled: {
            borderColor: "gray.400",
          },
          _focus: {
            borderColor: "brand.500",
            boxShadow: `0 0 0 1px #DA18A3}`,
          },
        },
      },
      sizes: {
        lg: {
          py: "17px",
          px: "29px",
        },
      },
    },
    FormLabel: {
      baseStyle: {
        mb: 4,
        fontSize: "24px",
        lineHeight: "base",
        fontWeight: "semibold",
      },
    },
    Select: {
      sizes: {
        lg: {
          field: {
            h: "60px",
            px: "29px",
          },
          icon: {
            width: "3rem",
            fontSize: "2.25rem",
          },
        },
      },
      variants: {
        outline: {
          field: {
            borderRadius: "10px",
            borderColor: "gray.400",
            _hover: {
              borderColor: "brand.500",
            },
            _disabled: {
              borderColor: "gray.400",
            },
            _focus: {
              borderColor: "brand.500",
              boxShadow: `0 0 0 1px #DA18A3}`,
            },
          },
        },
      },
    },
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: "none",
        },
      },
    },
  },
});

export default theme;
