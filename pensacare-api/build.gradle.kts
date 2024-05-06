plugins {
    java
    id("org.springframework.boot") version "3.2.4"
    id("io.spring.dependency-management") version "1.1.4"
    id("org.hibernate.orm") version "6.4.4.Final"
    id("org.graalvm.buildtools.native") version "0.9.28"
}

group = "br.com.pensalab"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_17
}

configurations {
    compileOnly {
        extendsFrom(configurations.annotationProcessor.get())
    }
}

repositories {
    mavenCentral()
}

val uuidCreatorVersion: String = "5.3.3"
val jwtVersion: String = "0.12.5"
val modelMapperVersion: String = "3.0.0"
val springDocVersion: String = "2.5.0"
val validatorVersion: String = "8.0.1.Final"

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("io.jsonwebtoken:jjwt-api:${jwtVersion}")
    implementation("org.modelmapper:modelmapper:${modelMapperVersion}")
    implementation("com.github.f4b6a3:uuid-creator:${uuidCreatorVersion}")
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:${springDocVersion}")
    implementation("org.hibernate.validator:hibernate-validator:${validatorVersion}")
    implementation("org.springframework.boot:spring-boot-starter-oauth2-resource-server")

    runtimeOnly("io.jsonwebtoken:jjwt-impl:${jwtVersion}")
    runtimeOnly("io.jsonwebtoken:jjwt-jackson:${jwtVersion}")
    runtimeOnly("org.postgresql:postgresql")

    compileOnly("org.projectlombok:lombok")

    developmentOnly("org.springframework.boot:spring-boot-devtools")

    annotationProcessor("org.projectlombok:lombok")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.springframework.boot:spring-boot-testcontainers")
    testImplementation("io.projectreactor:reactor-test")
    testImplementation("org.springframework.security:spring-security-test")
    testImplementation("org.testcontainers:junit-jupiter")
    testImplementation("org.testcontainers:postgresql")
}

tasks.withType<Test> {
    useJUnitPlatform()
}

hibernate {
    enhancement {
        enableAssociationManagement.set(true)
    }
}

