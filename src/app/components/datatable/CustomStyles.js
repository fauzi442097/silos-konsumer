const CustomStyles = {
    table: {
      style: {
        color: "red",
        backgroundColor: "#fff"
      }
    },
    tableWrapper: {
      style: {
        display: "table"
      }
    },
    header: {
      style: {
        color: "#181C32",
        fontSize: "calc(1.26rem + 0.12vw)",
        fontWeight: 500
      }
    },
    headCells: {
      style: {
        background: "#F9F9F9",
        color: "#3E97FF"
      }
    },
    head: {
      style: {
        color: "#B5B5C3",
        fontSize: ".95rem",
        fontWeight: 600,
        textTransform: "uppercase",
        marginTop: "1rem"
      }
    },
    headRow: {
      style: {
        borderBottomWidth: "1px",
        borderBottomColor: "#F4F4F4",
        borderBottomStyle: "dashed"
      }
    },
    contextMenu: {
      style: {
        backgroundColor: "#F4F4F4",
        fontSize: "1.3rem",
        borderRadius: "8px",
        fontWeight: 400,
        paddingLeft: "16px",
        paddingRight: "8px",
        transform: "translate3d(0, -100%, 0)",
        transitionDuration: "125ms",
        transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
        willChange: "transform",
        position: "absolute"
      },
      activeStyle: {
        transform: "translate3d(0, 0, 0)"
      }
    },
    highlightOnHoverStyle: {
      color: "red",
      background: "red"
    },
    rows: {
      style: {
        "&:not(:last-of-type)": {
          borderBottomStyle: "dashed",
          borderBottomWidth: "1px",
          borderBottomColor: "#F4F4F4"
        },
        color: "#7e8299"
      },
      selectedHighlightStyle: {
        // use nth-of-type(n) to override other nth selectors
        "&:nth-of-type(n)": {
          color: "#3E97FF",
          backgroundColor: "#EEF6FF",
          borderBottomColor: "#3E97FF"
        }
      },
      highlightOnHoverStyle: {},
      stripedStyle: {}
    },
    cells: {
      style: {
        paddingTop: "1.25rem",
        paddingBottom: "1.25rem",
        fontSize: "1.075rem",
        fontWeight: 500,
        wordBreak: "break-word",
        lineHeight: "1.5",
        border: 0
      }
    }
  }
  
  export default CustomStyles
  