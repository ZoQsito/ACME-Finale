<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PanierRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PanierRepository::class)]
#[ApiResource]
class Panier
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'integer', nullable: true)]
    private $quantite;

    // #[ORM\ManyToOne(targetEntity: User::class)]
    // #[ORM\JoinColumn(nullable: false)]
    // private $idUser;


    #[ORM\Column(type: 'string', length: 255)]
    private $nom_produit;

    #[ORM\Column(type: 'float')]
    private $prix_produit;

    #[ORM\Column(type: 'integer')]
    private $reference_produit;

    #[ORM\Column(type: 'blob', nullable: true)]
    private $photo_produit;

    #[ORM\Column(type: 'integer')]
    private $id_produit;

    #[ORM\Column(type: 'string', length: 255)]
    private $email;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuantite(): ?int
    {
        return $this->quantite;
    }

    public function setQuantite(?int $quantite): self
    {
        $this->quantite = $quantite;

        return $this;
    }


    public function getNomProduit(): ?string
    {
        return $this->nom_produit;
    }

    public function setNomProduit(string $nom_produit): self
    {
        $this->nom_produit = $nom_produit;

        return $this;
    }

    public function getPrixProduit(): ?float
    {
        return $this->prix_produit;
    }

    public function setPrixProduit(float $prix_produit): self
    {
        $this->prix_produit = $prix_produit;

        return $this;
    }

    public function getReferenceProduit(): ?int
    {
        return $this->reference_produit;
    }

    public function setReferenceProduit(int $reference): self
    {
        $this->reference_produit = $reference;

        return $this;
    }

    public function getPhotoProduit()
    {
        return $this->photo_produit;
    }

    public function setPhotoProduit($photo_produit): self
    {
        $this->photo_produit = $photo_produit;

        return $this;
    }

    public function getIdProduit(): ?int
    {
        return $this->id_produit;
    }

    public function setIdProduit(int $id_produit): self
    {
        $this->id_produit = $id_produit;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }
}
