//import { hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { TASK_STATUS } from "@prisma/client";

const getRandomTaskStatus = () => {
  const statuses = [
    TASK_STATUS.COMPLETED,
    TASK_STATUS.NOT_STARTED,
    TASK_STATUS.STARTED,
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const main = async () => {
  const user = await db.user.upsert({
    //create if it doesn't exist
    where: { email: "example@example.com" }, //1. find this

    update: {}, //2. if found, apply these updates

    create: { //3. if not, create it
      email: "example@example.com",
      firstName: "User",
      lastName: "Person",
      //password: await hashPassword("password"),
      password: await "password",
      projects: {
        create: new Array(5).fill(1).map((_, i) => {
          return {
            name: `Project ${i}`,
            due: new Date(2023, 22, 2),
          };
        }),
      },
    },

    include: {
      projects: true,
    },
  });

  const tasks = await Promise.all(
    user.projects.map((project: any) => {
      return db.task.createMany({
        data: new Array(10).fill(1).map((_, i) => {
          return {
            name: `Task ${i}`,
            ownerId: user.id,
            projectId: project.id,
            description: `Description for Task ${i}`,
            status: getRandomTaskStatus(),
          };
        }),
      });
    })
  );
  console.log({ user, tasks });
};

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await db.$disconnect();
    process.exit(1);
  });
