import { useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { Alert } from "react-native";

/**
 * Reusable hook for connecting to market socket and receiving trendline alerts
 * @param userId - User ID for joining user-specific room
 * @returns Socket instance reference
 */
export const useMarketSocket = (userId: number) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Only connect if userId is valid
    if (!userId || userId <= 0) {
      console.log("[Socket] Invalid userId, skipping connection");
      return;
    }

    const SOCKET_URL = "https://api.dautubenvung.vn/marketStream";

    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      reconnectionAttempts: 5,
      auth: { userId }, // Pass userId for backend authentication/room joining
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("[Socket] Connected:", socket.id);

      // Join user-specific room
      socket.emit("joinUserRoom", { userId });
    });

    socket.on("disconnect", () => {
      console.log("[Socket] Disconnected");
    });

    // Receive trendlineCross alerts
    socket.on("trendlineCross", (msg) => {
      console.log("[Socket] trendlineCross event:", msg);
      let type = msg.type;
      Alert.alert(
        "Cảnh báo giá",
        `Mã ${msg.symbol}: Giá đã cắt qua ${
          type === "price" ? `giá ${msg.target_price}` : "dòng trendline"
        }!\nGiá hiện tại: ${msg.price}`
      );
    });

    // Cleanup on unmount
    return () => {
      console.log("[Socket] Cleaning up connection");
      socket.disconnect();
    };
  }, [userId]);

  return socketRef.current;
};
