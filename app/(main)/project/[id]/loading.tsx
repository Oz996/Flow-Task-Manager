import React from "react";
import Container from "../../../../components/container";
import ProjectSkeleton from "./components/project-skeleton";

export default function Loading() {
  return (
    <section className="w-full px-8 absolute z-0">
      <Container>
        <ProjectSkeleton />
      </Container>
    </section>
  );
}
