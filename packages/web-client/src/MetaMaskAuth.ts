import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
    MetaMaskAuth?: any;
  }
}

export default class MetaMaskAuth {
  private static instance: MetaMaskAuth;
  private address: string | null = null;

  private constructor() {
    console.log("MetaMaskAuth instance created");
    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', async (accounts: string[]) => {
        if (accounts.length > 0) {
          this.address = accounts[0];
          console.log("Account changed:", this.address);
        } else {
          this.address = null;
          console.log("No accounts available");
        }
      });
    }
  }

  public static getInstance(): MetaMaskAuth {
    if (!MetaMaskAuth.instance) {
      MetaMaskAuth.instance = new MetaMaskAuth();
    }
    return MetaMaskAuth.instance;
  }

  public async connect(): Promise<string> {
    if (!window.ethereum) {
      console.error("MetaMask not found in window.ethereum");
      throw new Error("MetaMask is not installed!");
    }

    try {
      console.log("Requesting MetaMask accounts...");
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      }) as string[];
      
      this.address = accounts[0];
      console.log("Connected to address:", this.address);
      
      // Dispatch event for wallet connection
      const event = new CustomEvent('walletConnected', { 
        detail: { address: this.address } 
      });
      window.dispatchEvent(event);
      
      return this.address;
    } catch (error) {
      console.error("Error connecting to MetaMask", error);
      throw error;
    }
  }

  public getAddress(): string | null {
    return this.address;
  }

  public async signMessage(message: string): Promise<string> {
    if (!window.ethereum || !this.address) {
      throw new Error("Not connected to MetaMask!");
    }

    try {
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, this.address]
      }) as string;
      
      return signature;
    } catch (error) {
      console.error("Error signing message", error);
      throw error;
    }
  }
}

// Create and expose the instance globally
(window as any).MetaMaskAuth = {
  getInstance: () => MetaMaskAuth.getInstance()
};