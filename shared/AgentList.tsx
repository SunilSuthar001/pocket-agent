export const AgentList  =[

    {
        id:1,
        name:"Writting Assistant",
        desc :"Write , rewrite and fix texts in seconds",
        // image: require("../../assets/agent1.png"),

initialText:"Generate an Text to your boss asking for a raise.",

prompt:"You are an expert email generator. Your task is to help users draft professional and effective emails based on their requirements.",
type:"chat" ,
featured:false,
    },

    {
        id:2,
        name:"Email generator",
        desc :"Draft Professional emails in seconds",
        // image: require("../../assets/agent1.png"),

initialText:"Generate an email to your boss asking for a raise.",

prompt:"You are an expert email generator. Your task is to help users draft professional and effective emails based on their requirements.",
type:"chat" ,
featured:false,
    },

     {
    id: 3,
    name: "Image Generator",
    desc: "Create stunning images from text prompts.",
    initialText: "Generate an image of a futuristic city skyline at sunset.",
    prompt:
      "You are an AI image prompt generator. Help users describe the perfect image for text-to-image tools.",
    type: "image",
            // image: require("../../assets/agent1.png"),

    featured: true,
  },
  {
    id: 4,
    name: "Translations",
    desc: "Translate text accurately between languages.",
    initialText: "Translate 'Good morning, how are you?' into French.",
    prompt:
      "You are a multilingual translation expert. Translate text precisely while maintaining tone and cultural meaning.",
    type: "chat",
            // image: require("../../assets/agent1.png"),

    featured: false,
  },

];