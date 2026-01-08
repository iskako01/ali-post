import { verifyAuth } from "@/lib/auth";
import { getTrainings } from "@/lib/training";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function TrainingPage() {
  const verifiedUser = await verifyAuth();

  if (!verifiedUser.user) {
    return redirect("/");
  }

  const trainingSessions = getTrainings();

  return (
    <main>
      <h1>Find your favorite activity</h1>
      <ul className="training-sessions">
        {trainingSessions.map((training) => (
          <li key={training.id}>
            <Image
              src={`/trainings${training.image}`}
              alt={training.title}
              width={200}
              height={200}
            />
            <div>
              <h2>{training.title}</h2>
              <p>{training.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
