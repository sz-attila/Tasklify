import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      res.status(200).json(response.data);
    } catch (error) {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
