package no.nav.bidrag.dokument.produksjon

import io.prometheus.client.Summary

val OPENHTMLTOPDF_RENDERING_SUMMARY: Summary =
    Summary.Builder()
        .name("openhtmltopdf_rendering_summary")
        .help("Time it takes to render a PDF")
        .labelNames("template_type")
        .register()
