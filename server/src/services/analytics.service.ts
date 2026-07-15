import { prisma } from "../config/db";

export class AnalyticsService {
  static async engineerPerformance() {
    const engineers =
      await prisma.user.findMany({
        where: {
          role: "ENGINEER",
        },
        include: {
          assignedTickets: true,
        },
      });

    return engineers.map(
      (engineer) => ({
        name: engineer.name,

        totalTickets:
          engineer.assignedTickets.length,

        resolvedTickets:
          engineer.assignedTickets.filter(
            (t) =>
              t.status ===
              "RESOLVED"
          ).length,

        openTickets:
          engineer.assignedTickets.filter(
            (t) =>
              t.status ===
              "OPEN"
          ).length,
      })
    );
  }
}