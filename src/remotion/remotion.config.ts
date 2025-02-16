import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("png"); // Keep PNG for best intermediate quality
Config.setCodec("prores");
Config.setProResProfile("4444-xq");
Config.setColorSpace("bt709"); // Ensures correct colors
Config.setPixelFormat("yuva444p10le");

Config.setConcurrency("100%"); // Ensures that concurrent renderings don't happen
Config.setHardwareAcceleration("disable");
Config.setMuted(true);
