#!/bin/bash

# URL del server
BASE_URL="http://localhost:8080"

echo "=========================="
echo " 1. REGISTRAZIONE CLIENTE"
echo "=========================="
curl -X POST "$BASE_URL/customers" \
     -H "Content-Type: application/json" \
     -d '{ "name": "Mario Rossi", "email": "mario@example.com", "password": "password123" }'
echo -e "\n"

echo "=========================="
echo " 2. LOGIN CLIENTE (Genera Token JWT)"
echo "=========================="
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
     -H "Content-Type: application/json" \
     -d '{ "email": "mario@example.com", "password": "password123" }')
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')
echo "Token ottenuto: $TOKEN"
echo -e "\n"

echo "=========================="
echo " 3. LISTA PRODOTTI"
echo "=========================="
curl -X GET "$BASE_URL/products"
echo -e "\n"

echo "=========================="
echo " 4. CREAZIONE PRODOTTO"
echo "=========================="
curl -X POST "$BASE_URL/products" \
     -H "Content-Type: application/json" \
     -d '{ "name": "Laptop", "price": 1200 }'
echo -e "\n"

echo "=========================="
echo " 5. ELIMINAZIONE PRODOTTO (ID=1)"
echo "=========================="
curl -X DELETE "$BASE_URL/products/1"
echo -e "\n"

echo "=========================="
echo " 6. CREAZIONE ORDINE (Autenticato)"
echo "=========================="
curl -X POST "$BASE_URL/orders" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer $TOKEN" \
     -d '{ "product_id": 1, "quantity": 2 }'
echo -e "\n"

echo "=========================="
echo " 7. LISTA ORDINI (Autenticato)"
echo "=========================="
curl -X GET "$BASE_URL/orders" \
     -H "Authorization: Bearer $TOKEN"
echo -e "\n"

echo "=========================="
echo " 8. ELIMINAZIONE ORDINE (ID=1, Autenticato)"
echo "=========================="
curl -X DELETE "$BASE_URL/orders/1" \
     -H "Authorization: Bearer $TOKEN"
echo -e "\n"

echo "=========================="
echo " 9. STATO DEL SERVER"
echo "=========================="
curl -X GET "$BASE_URL/status"
echo -e "\n"

