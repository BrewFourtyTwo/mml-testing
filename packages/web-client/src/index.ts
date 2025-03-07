import { Networked3dWebExperienceClient } from "@mml-io/3d-web-experience-client";
import MetaMaskAuth from "./MetaMaskAuth";

const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
const host = window.location.host;
const userNetworkAddress = `${protocol}//${host}/network`;
const chatNetworkAddress = `${protocol}//${host}/chat-network`;

async function initializeClient() {
  const metaMask = MetaMaskAuth.getInstance();
  const holder = Networked3dWebExperienceClient.createFullscreenHolder();
  const app = new Networked3dWebExperienceClient(holder, {
    sessionToken: (window as any).SESSION_TOKEN,
    userNetworkAddress,
    voiceChatAddress: "ws://localhost:8080/voice-chat",
    chatNetworkAddress,
    animationConfig: {
      airAnimationFileUrl: "./assets/models/genshinjump.glb",
      idleAnimationFileUrl: "./assets/models/idle_genshin2.glb",
      jogAnimationFileUrl: "./assets/models/genshinrun.glb",
      sprintAnimationFileUrl: "./assets/models/genshinrun.glb",
      doubleJumpAnimationFileUrl: "./assets/models/genshinjump.glb",
    },
    skyboxHdrJpgUrl: "./assets/hdr/puresky_2k.jpg",
    mmlDocuments: [{ url: `${protocol}//${host}/playground` }],
  });

  // Initialize MetaMask and update user data after client initialization
  metaMask.connect()
    .then(address => {
      // Use appropriate method to update user data
      // We'll need to check the client's API for the correct method
    })
    .catch(console.error);

  app.update();
}

initializeClient();
