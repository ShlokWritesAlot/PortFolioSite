export const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const terminalTypeEffect = {
  hidden: { width: "0%" },
  visible: { 
    width: "100%",
    transition: { duration: 1.5, ease: "linear" }
  }
};

export const cardHover = {
  rest: { y: 0, scale: 1, boxShadow: "0 0 0 rgba(0, 217, 255, 0)" },
  hover: { 
    y: -8, 
    scale: 1.02,
    boxShadow: "0 0 20px rgba(0, 217, 255, 0.5)",
    transition: { type: "spring", stiffness: 400, damping: 25 }
  }
};
