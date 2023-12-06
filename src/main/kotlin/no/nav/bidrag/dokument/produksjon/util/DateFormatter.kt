package no.nav.bidrag.dokument.produksjon.util

import java.time.YearMonth
import java.time.format.DateTimeFormatter
import java.util.Locale


val yearMonthFormatter: DateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM")
val yearMonthDayFormatter: DateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd")

fun formatToYearMonth(value: String): YearMonth =
    try {
        YearMonth.parse(value, yearMonthFormatter)
    } catch (e: Exception) {
        YearMonth.parse(value, yearMonthDayFormatter)
    }
