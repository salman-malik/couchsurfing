import userData from "../../lib/user-data";

export async function GET() {
    return Response.json(userData);
}