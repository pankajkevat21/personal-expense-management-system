# ===== Stage 1: Build =====
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app

# Pehle pom.xml copy karo (dependency cache ke liye)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Ab source code copy karo
COPY src ./src

# Build karo (tests skip karke)
RUN mvn clean package -DskipTests

# ===== Stage 2: Run =====
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Build stage se jar copy karo
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]