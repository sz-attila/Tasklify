import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/tasks/getTasks",
        {
          headers: {
            Authorization: `Bearer ${req.headers.authorization}`,
          },
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
