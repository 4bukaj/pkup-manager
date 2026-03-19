import {
  Request,
  Response,
  NextFunction,
} from "express";
import { supabase } from "../supabaseClient";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email?: string;
  };
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader =
    req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .json({
        error:
          "No authorization header provided",
      });
  }

  const token =
    authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({
        error: "No token provided",
      });
  }

  try {
    const {
      data: { user },
      error,
    } =
      await supabase.auth.getUser(
        token,
      );

    if (error || !user) {
      return res
        .status(401)
        .json({
          error:
            "Invalid or expired token",
        });
    }

    req.user = {
      id: user.id,
      email: user.email,
    };

    next();
  } catch (err) {
    console.error("Auth error:", err);
    res
      .status(401)
      .json({
        error: "Authentication failed",
      });
  }
};
