<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\HistoriqueCommandeRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: HistoriqueCommandeRepository::class)]
#[ApiResource]
class HistoriqueCommande
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'float')]
    private $PrixTotal;

    #[ORM\Column(type: 'integer')]
    private $qteProduit;

    #[ORM\Column(type: 'date')]
    private $dateAchat;

    #[ORM\Column(type: 'integer')]
    private $reference;

    #[ORM\Column(type: 'string', length: 255)]
    private $email;

    #[ORM\Column]
    private ?int $status = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPrixTotal(): ?float
    {
        return $this->PrixTotal;
    }

    public function setPrixTotal(float $PrixTotal): self
    {
        $this->PrixTotal = $PrixTotal;

        return $this;
    }

    public function getQteProduit(): ?int
    {
        return $this->qteProduit;
    }

    public function setQteProduit(int $qteProduit): self
    {
        $this->qteProduit = $qteProduit;

        return $this;
    }

    public function getDateAchat(): ?\DateTimeInterface
    {
        return $this->dateAchat;
    }

    public function setDateAchat(\DateTimeInterface $dateAchat): self
    {
        $this->dateAchat = $dateAchat;

        return $this;
    }

    public function getReference(): ?int
    {
        return $this->reference;
    }

    public function setReference(int $reference): self
    {
        $this->reference = $reference;

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

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(int $status): self
    {
        $this->status = $status;

        return $this;
    }

}
