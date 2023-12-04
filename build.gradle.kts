import org.jetbrains.kotlin.ir.backend.js.compile

group = "no.nav.bidrag"
version = "1.0.0" //This will never change. See GitHub releases for docker image release
val handlebarsVersion = "4.3.1"
val jacksonVersion = "2.15.3"
val jaxbVersion = "4.0.4"
val jaxbApiVersion = "2.3.1"
val jsoupVersion = "1.16.2"
val kluentVersion = "1.72"
val logbackVersion = "1.4.11"
val logstashEncoderVersion = "7.4"
val openHtmlToPdfVersion = "1.0.10"
val prometheusVersion = "0.16.0"
val junitJupiterVersion = "5.10.1"
val verapdfVersion = "1.24.1"
val ktfmtVersion = "0.44"
val bidragTransportVersion = "20231201150118_8d33deb"
val bidragCommonsVersion = "20231201131246_f719b2b"
val kotlinloggerVesion = "5.1.0"

plugins {
    id("application")
    kotlin("jvm") version "1.9.20"
    id("org.springframework.boot") version "3.2.0"
    id("io.spring.dependency-management") version "1.1.4"
    kotlin("plugin.spring") version "1.9.20"
    id("com.diffplug.spotless") version "6.22.0"
    id("com.github.johnrengelman.shadow") version "8.1.1"
    id("com.github.ben-manes.versions") version "0.49.0"
}

application {
    mainClass.set("no.nav.bidrag.dokument.produksjon.AppKt")
}
java {
    sourceCompatibility = JavaVersion.VERSION_21
}
tasks {

    test {
        useJUnitPlatform {}
        testLogging {
            events("passed", "skipped", "failed")
            showStandardStreams = true
        }
    }

    compileKotlin{
        kotlinOptions.jvmTarget = "21"

    }

    shadowJar {
        archiveBaseName = "app"
        archiveClassifier = ""
        archiveVersion = ""
        isZip64 = true
        manifest {
            attributes(
                mapOf(
                    "Main-Class" to "no.nav.bidrag.dokument.produksjon.AppKt",
                ),
            )
        }
        duplicatesStrategy = DuplicatesStrategy.INCLUDE
    }

    spotless {
        kotlin { ktfmt(ktfmtVersion).kotlinlangStyle() }
        check {
            dependsOn("spotlessApply")
        }
    }
}

repositories {
    mavenCentral()
    mavenLocal()

    maven {
        name = "github"
        url = uri("https://maven.pkg.github.com/navikt/pdfgen-core")
        credentials {
            username = System.getenv("GITHUB_USERNAME") ?: "x-access-token"
            password = System.getenv("GITHUB_TOKEN")
        }
    }
}


dependencies {
    // Spring
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.boot:spring-boot-starter-jetty")
    implementation("org.springframework.boot:spring-boot-starter-web"){
        exclude("org.springframework.boot", "spring-boot-starter-tomcat")
    }
    implementation("org.springframework.boot:spring-boot-starter-aop")
    implementation("org.springframework.boot:spring-boot-devtools")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.3.0")


    implementation("org.jetbrains.kotlin:kotlin-stdlib")

    implementation("com.github.jknack:handlebars:$handlebarsVersion")
    implementation("com.github.jknack:handlebars-jackson2:$handlebarsVersion")
    implementation("com.openhtmltopdf:openhtmltopdf-pdfbox:$openHtmlToPdfVersion")
    implementation("com.openhtmltopdf:openhtmltopdf-slf4j:$openHtmlToPdfVersion")
    implementation("com.openhtmltopdf:openhtmltopdf-svg-support:$openHtmlToPdfVersion")

    implementation("org.jsoup:jsoup:$jsoupVersion")
    implementation("com.fasterxml.jackson.core:jackson-core:$jacksonVersion")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin:$jacksonVersion")
    implementation("com.fasterxml.jackson.datatype:jackson-datatype-jsr310:$jacksonVersion")
    implementation("javax.xml.bind:jaxb-api:$jaxbApiVersion")
    implementation("org.glassfish.jaxb:jaxb-runtime:$jaxbVersion")

    implementation("io.prometheus:simpleclient_common:$prometheusVersion")
    implementation("io.prometheus:simpleclient_hotspot:$prometheusVersion")

    implementation("org.verapdf:validation-model:$verapdfVersion")
    implementation("io.github.oshai:kotlin-logging-jvm:$kotlinloggerVesion")

    implementation("ch.qos.logback:logback-classic:$logbackVersion")
    implementation("net.logstash.logback:logstash-logback-encoder:$logstashEncoderVersion")
    implementation("no.nav.pdfgen:pdfgen-core:1.1.0")
    implementation("no.nav.bidrag:bidrag-transport:$bidragTransportVersion"){
        exclude("org.springframework.boot", "spring-boot-starter-web")
    }
    implementation("no.nav.bidrag:bidrag-commons:$bidragCommonsVersion"){
        exclude("org.springframework.boot", "spring-boot-starter-web")
        exclude("org.apache.tomcat.embed", "tomcat-embed-core")
        exclude("org.apache.tomcat.embed", "tomcat-embed-el")
    }

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testImplementation("org.junit.jupiter:junit-jupiter-api:$junitJupiterVersion")
    testImplementation("org.junit.jupiter:junit-jupiter-params:$junitJupiterVersion")
    testImplementation("org.junit.jupiter:junit-jupiter-engine:$junitJupiterVersion")

}
