import { User } from "../lib/definitions";
import Link from "next/link";


export default async function UsersPage() {
    /** Correct way to handle it would be to call the api/data function directly
     * but for the sake of meeting requirements we are going to fetch the data from the api
     **/
    let environment;
    if (!process.env.APP_URL) {
        environment = 'http://localhost:3000';
    } else {
        environment = process.env.APP_URL;
    }

    const apiCall = await fetch(`${environment}/users/api`);

    // debating whether to fetch the data directly from the API or save it locally.
    // const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await apiCall.json();

    return (
        <div className="grid grid-cols-2 gap-2 p4">
            {users.map((user: User) => (
                <Link key={user.id} href={`/users/${user.id}`}>
                    <div key={user.id}
                        className="flex items-center justify-between p-4 bg-white shadow rounded-lg text-gray-600"
                    >
                        <div className="flex flex-col space-y-1">
                            <h2 className="text-lg font-semibold">{user.name}</h2>
                            <p className="text-sm">{user.username}</p>
                        </div>
                        <div className="flex flex-col space-y-1 items-end">
                            <p className="text-md">{user.email}</p>
                            <p className="text-md">{user.phone}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}