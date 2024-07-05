import { User, Friend } from "../../lib/definitions";
import friendsData from "../../lib/friends-data";
import Link from "next/link";

export default async function displayUser({ 
    params: { userId }, 
}: { 
    params: { userId: string }
}) {
    let environment;

    if (!process.env.APP_URL) {
        environment = 'http://localhost:3000';
    } else {
        environment = process.env.APP_URL;
    }

    const apiCall = await fetch(`${environment}/users/api`);
    
    const users = await apiCall.json();
    const user: User | undefined = await users.find((user: User) => user.id === parseInt(userId));

    if (!user) {
        return <h1>User not found</h1>;
    }
    
    return (
        <>
            <div className="p-4 bg-white shadow rounded-lg text-gray-600">
                <h2 className="text-lg font-semibold">Name: {user?.name}</h2>
                <p className="text-md">Username: {user?.username}</p>
                <p className="text-md">Email: {user?.email}</p>
                <p className="text-md">Phone: {user?.phone}</p>
                <p className="text-md">Website: {user?.website}</p>
                <p className="text-md">City: {user?.address.city}</p>
                <p className="text-md">Company: {user?.company.name}</p>
            </div>
            <div>
                <div className="p-4 bg-white shadow rounded-lg text-gray-600">
                    <h2 className="text-lg font-semibold">Friends</h2>
                </div>
                {await showFriends(userId)}
            </div>
        </>
    );    
}

// This should probably be in a separate file, but for the sake of the exercise I'm keeping it here.
async function showFriends(userId: string) {
    let environment;

    if (!process.env.APP_URL) {
        environment = 'http://localhost:3000';
    } else {
        environment = process.env.APP_URL;
    }
    
    const apiCall = await fetch(`${environment}/users/api`);
    const users = await apiCall.json();

    const foundMutualFriends: number[] | undefined = friendsData.find((friend: Friend) => friend.id === parseInt(userId))?.mutualFriends;
    const friends: User[] = users.filter((user: User) => foundMutualFriends?.includes(user.id));

    return (
        <div className="grid grid-cols-2 gap-2 p4">
            {friends.map((friend) => (
                <Link key={friend.id} href={`/users/${friend.id}`}>
                    <div key={friend.id}
                        className="flex items-center justify-between p-4 bg-white shadow rounded-lg text-gray-600"
                    >
                        <div className="flex flex-col space-y-1">
                            <h2 className="text-lg font-semibold">{friend.name}</h2>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}