# AREA-51

## Contributors :

- Benjamin Gayaud
- Eddy Gardes
- Alexandre Chouteau
- Antonin Campi
- Jacques Sapin

## Technos :

### Front
```mermaid
graph LR
A --> B
A((AREA)) --> C
B[App mobile] --> E{Java}
C[App web] --> D{React}
```

### Back
```mermaid
graph LR
A --> B
A((AREA)) --> C
B[App mobile] --> E{Java}
A --> F[Api]
F --> G{Node.js + Rest}
C[App web] --> D{React}
```

## Usage : 

```
docker compose up -d --build
```
and go on `http://localhost/8081`

[AREA51](http://localhost/8081)
