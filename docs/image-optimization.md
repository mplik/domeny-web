Optymalizacja obrazów i przygotowanie srcset

Ten dokument zawiera szczegółowe, praktyczne instrukcje jak przygotować responsywne wersje obrazów (JPG/WebP) i wstawić je do kodu HTML za pomocą `srcset` / `picture`. Zapisz ten plik w repo, aby instrukcje były dostępne niezależnie od środowiska developerskiego.

## Dlaczego warto przygotować srcset
- Oszczędność transferu i szybsze ładowanie na urządzeniach mobilnych.
- Lepsze wyniki w narzędziach Lighthouse (LCP, FCP).
- Przeglądarka wybiera optymalny plik (rozmiar i format) dla danego ekranu i DPR.

## Sugerowane rozmiary i formaty
- Rozmiary: 1200w, 768w, 480w (możesz dodać więcej, zależnie od projektu).
- Format preferowany: WebP (mniejsze pliki). Fallback: JPG/PNG.
- Nazewnictwo rekomendowane: `basename-1200.webp`, `basename-768.webp`, `basename-480.webp` i odpowiednie `*.jpg`.

## Przykładowy HTML z `picture` + `srcset`
```
<div class="team-photo-wrap">
  <picture>
    <source type="image/webp"
            srcset="images/team-faq-480.webp 480w, images/team-faq-768.webp 768w, images/team-faq-1200.webp 1200w"
            sizes="(min-width:1200px) 1200px, (min-width:768px) 768px, 100vw">
    <img
      src="images/team-faq-480.jpg"
      srcset="images/team-faq-480.jpg 480w, images/team-faq-768.jpg 768w, images/team-faq-1200.jpg 1200w"
      sizes="(min-width:1200px) 1200px, (min-width:768px) 768px, 100vw"
      alt="Zespół odpowiadający na FAQ"
      class="trust-banner team-photo"
      loading="lazy">
  </picture>
</div>
```

### Wyjaśnienie
- `srcset` — lista dostępnych wersji z ich szerokościami (np. `480w`).
- `sizes` — informuje przeglądarkę, jaka będzie CSS-owa szerokość tego obrazu w danym warunku; pomaga w wyborze odpowiedniego pliku z `srcset`.
- `<source type="image/webp">` — najpierw podaj WebP; jeśli przeglądarka nie obsługuje WebP, użyje elementu `<img>` jako fallback.

## Skrypt do generowania plików (ImageMagick + cwebp)
Zainstaluj narzędzia: `imagemagick` i `webp` (cwebp). Przykład (Ubuntu):
```
sudo apt update
sudo apt install -y imagemagick webp

SRC="podfoldern/images/team-faq-original.jpg"  # zmień na ścieżkę do źródła
OUTDIR="podfoldern/images"
basename="team-faq"

# resize i zapis jako zoptymalizowane jpg
convert "$SRC" -resize 1200x -strip -quality 85 "$OUTDIR/${basename}-1200.jpg"
convert "$SRC" -resize 768x  -strip -quality 85 "$OUTDIR/${basename}-768.jpg"
convert "$SRC" -resize 480x  -strip -quality 85 "$OUTDIR/${basename}-480.jpg"

# konwersja do WebP (jakość 80)
cwebp -q 80 "$OUTDIR/${basename}-1200.jpg" -o "$OUTDIR/${basename}-1200.webp"
cwebp -q 80 "$OUTDIR/${basename}-768.jpg"  -o "$OUTDIR/${basename}-768.webp"
cwebp -q 80 "$OUTDIR/${basename}-480.jpg"  -o "$OUTDIR/${basename}-480.webp"

# (opcjonalnie) usuń tymczasowe jpg jeśli chcesz zostawić tylko webp
# rm "$OUTDIR/${basename}-"*.jpg
```

Uwagi:
- `quality` (q) w `cwebp` 70–85 to zwykle dobry kompromis jakości/wagi.
- Możesz też konwertować bezpośrednio z oryginału do WebP i pominąć intermediate JPG.

## Testowanie
1. Otwórz `podfoldern/faq.html` w przeglądarce lub uruchom prosty serwer (`python3 -m http.server 8000`) i przejdź do `http://localhost:8000/podfoldern/faq.html`.
2. W DevTools → Network sprawdź, która wersja obrazu jest pobierana (kolumna Size/Initiator) i czy to właściwy rozmiar.
3. Testuj throttling (Slow 3G) oraz różne viewporty (mobile/tablet/desktop).
4. Uruchom Lighthouse i porównaj metryki LCP/CLS/FCP przed i po optymalizacji.

## Checklist przed merge / deploy
- [ ] Wszystkie wersje obrazów wygenerowane w katalogu `podfoldern/images`.
- [ ] Zaktualizowany HTML z `srcset` i `sizes`.
- [ ] Brak błędów 404 (obrazy dostępne).
- [ ] Testy manualne (desktop/mobile) pozytywne.
- [ ] (Opcjonalnie) Zoptymalizowany pipeline CI do generowania obrazów automatycznie.

## Dalsze kroki i automatyzacja
- Możesz zautomatyzować generowanie obrazów w CI (GitHub Actions) lub użyć serwisu CDN/image proxy (np. Cloudflare Images, imgix, Thumbor) do dynamicznej obsługi rozmiarów i formatów.
- Jeśli chcesz, mogę przygotować prosty GH Action, który przy pushu do `images/` wygeneruje wersje webp/jpg i doda je do repo.

---
Plik stworzony automatycznie — zawiera wszystkie polecenia i przykłady użyte podczas pracy nad `podfoldern/faq.html`.
