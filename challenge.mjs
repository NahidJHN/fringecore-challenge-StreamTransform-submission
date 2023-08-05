import net from "node:net";

// Create TCP server to handle incoming connections from clients
const server = net.createServer();

//ON a connection
server.on("connection", (connection) => {
  console.log("A client connected");

  //Create a TCP connection and connect the origin server
  const originServer = net.connect({
    port: 3032,
    host: "localhost",
  });

  //ON origin server
  originServer.on("connect", () => {
    console.log("Origin server is connected");

    //if you want to get the first instruction input from the final client then commented out the 2 lines below
    originServer.write("a");
    console.log("\n");
  });

  originServer.on("data", (originServerData) => {
    // Forward the data directly from the origin server to the final client
    const data = originServerData.toString("utf-8");

    const modifiedData = data.replaceAll(
      "i like big trains and i cant lie",
      "- ---- --- ------ --- - ---- ---"
    );

    connection.write(modifiedData);
  });

  //if I want to the instruction input from the final client client then remove the comment the even below
  //   connection.on("data", (data) => {
  //     // Forward the data directly from the final client to the origin server
  //     originServer.write(data);
  //   });

  originServer.on("error", (error) => {
    console.log("Failed to connect origin server:", error);
  });
});

server.on("error", (error) => {
  console.error("Server error ocurred:", error);
});

server.listen(3031, () => {
  console.log("Server started and listening on port 3031");
});
