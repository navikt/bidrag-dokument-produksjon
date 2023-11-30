group = "no.nav.bidrag"
version = "1.0.0" //This will never change. See GitHub releases for docker image release
val handlebarsVersion = "4.3.1"
val jacksonVersion = "2.15.3"
val jaxbVersion = "4.0.4"
val jaxbApiVersion = "2.3.1"
val jsoupVersion = "1.16.2"
val kluentVersion = "1.72"
val ktorVersion = "2.3.5"
val logbackVersion = "1.4.11"
val logstashEncoderVersion = "7.4"
val openHtmlToPdfVersion = "1.0.10"
val prometheusVersion = "0.16.0"
val junitJupiterVersion = "5.10.1"
val verapdfVersion = "1.24.1"
val ktfmtVersion = "0.44"
val kotlinloggerVesion = "5.1.0"

plugins {
    id("application")
    kotlin("jvm") version "1.9.20"
    id("com.diffplug.spotless") version "6.23.2"
    id("com.github.johnrengelman.shadow") version "8.1.1"
    id("com.github.ben-manes.versions") version "0.49.0"
}

application {
    mainClass.set("no.nav.bidrag.dokument.produksjon.BootstrapKt")
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
                    "Main-Class" to "no.nav.bidrag.dokument.produksjon.BootstrapKt",
                ),
            )
        }
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
    implementation("org.jetbrains.kotlin:kotlin-stdlib")
    implementation("io.ktor:ktor-server-cors:$ktorVersion")

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

    implementation("io.ktor:ktor-server-netty:$ktorVersion")
    implementation("io.ktor:ktor-server-core:$ktorVersion")
    implementation("io.ktor:ktor-serialization-jackson:$ktorVersion")
    implementation("io.ktor:ktor-server-content-negotiation:$ktorVersion")
    implementation("io.ktor:ktor-server-status-pages:$ktorVersion")

    implementation("io.prometheus:simpleclient_common:$prometheusVersion")
    implementation("io.prometheus:simpleclient_hotspot:$prometheusVersion")

    implementation("org.verapdf:validation-model:$verapdfVersion")
    implementation("io.github.oshai:kotlin-logging-jvm:$kotlinloggerVesion")

    implementation("ch.qos.logback:logback-classic:$logbackVersion")
    implementation("net.logstash.logback:logstash-logback-encoder:$logstashEncoderVersion")
    implementation("no.nav.pdfgen:pdfgen-core:1.0.2")

    testImplementation("org.junit.jupiter:junit-jupiter-api:$junitJupiterVersion")
    testImplementation("org.junit.jupiter:junit-jupiter-params:$junitJupiterVersion")
    testImplementation("org.junit.jupiter:junit-jupiter-engine:$junitJupiterVersion")

    testImplementation("io.ktor:ktor-client-cio:$ktorVersion")

}
